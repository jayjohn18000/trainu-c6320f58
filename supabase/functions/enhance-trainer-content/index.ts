import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-passcode",
};

interface EnhancementRequest {
  submissionId: string;
}

interface EnhancedContent {
  headline: string;
  subheadline: string;
  bio: string;
  stats: {
    clientCount: string;
    rating: string;
    yearsExperience: string;
  };
  suggestedTheme: string;
  programDescriptions: string[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin passcode
    const passcode = req.headers.get("x-admin-passcode");
    const adminPasscode = Deno.env.get("ADMIN_PASSCODE");

    if (!passcode || passcode !== adminPasscode) {
      console.log("Unauthorized: Invalid or missing passcode for enhance-trainer-content");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { submissionId }: EnhancementRequest = await req.json();

    if (!submissionId) {
      return new Response(
        JSON.stringify({ error: "submissionId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Enhancing content for submission: ${submissionId}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the submission
    const { data: submission, error: fetchError } = await supabase
      .from("trainer_submissions")
      .select("*")
      .eq("id", submissionId)
      .single();

    if (fetchError || !submission) {
      console.error("Error fetching submission:", fetchError);
      return new Response(
        JSON.stringify({ error: "Submission not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse programs if it's a string
    const programs = typeof submission.programs === 'string'
      ? JSON.parse(submission.programs)
      : submission.programs || [];

    // Get Lovable AI API key
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build the prompt for AI enhancement
    const prompt = `You are a professional copywriter specializing in personal trainer and fitness coach websites. Analyze the following trainer information and generate enhanced, professional content.

TRAINER INFORMATION:
- Name: ${submission.full_name}
- Business Name: ${submission.business_name}
- Specialty: ${submission.specialty}
- Location: ${submission.location}
- Current Bio: ${submission.bio}
- Coaching Style: ${submission.coaching_style || "Not specified"}
- Programs: ${programs.map((p: any) => `${p.title}: ${p.description}`).join("; ")}

GENERATE THE FOLLOWING (respond in valid JSON only, no markdown):

1. "headline": A powerful, concise headline (max 8 words) that captures the trainer's value proposition. Use their specialty. Format: "Action. Result." (e.g., "Build Strength. Gain Confidence.")

2. "subheadline": A compelling subheadline (1-2 sentences, max 30 words) that expands on the headline and speaks directly to the target audience. Include what makes this trainer unique.

3. "bio": An enhanced, professional version of their bio (max 100 words). Keep their voice but polish grammar, add credibility indicators, and include a clear call-to-action at the end.

4. "stats": Infer realistic stats based on their bio and experience:
   - "clientCount": Estimate clients (format: "XX+", e.g., "150+", "300+")
   - "rating": A rating between 4.8-5.0 (format: "X.X")
   - "yearsExperience": Infer from bio or default to "5+" (format: "X+")

5. "suggestedTheme": Suggest a color theme based on their specialty:
   - Weight Loss/Transformation → "green"
   - Strength/Muscle Building → "orange" or "red"
   - Yoga/Wellness/Mindfulness → "purple" or "cyan"
   - HIIT/CrossFit/Combat → "red"
   - General Fitness → "blue"
   - Bodybuilding → "gold"
   - Women's Fitness → "pink"

6. "programDescriptions": Enhanced descriptions for each program (array of strings, same order as input). Make them benefit-focused and compelling. Max 50 words each.

IMPORTANT: Respond with ONLY valid JSON, no markdown code blocks or additional text.`;

    console.log("Calling Lovable AI for content enhancement...");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a professional copywriter. Always respond with valid JSON only, no markdown formatting or code blocks."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content;

    if (!aiContent) {
      console.error("No content in AI response:", aiData);
      return new Response(
        JSON.stringify({ error: "AI returned empty response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("AI response received, parsing...");

    // Parse the AI response (remove potential markdown code blocks)
    let enhancedContent: EnhancedContent;
    try {
      // Clean up the response - remove markdown code blocks if present
      let cleanContent = aiContent.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      enhancedContent = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiContent);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response", raw: aiContent }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate the response structure
    if (!enhancedContent.headline || !enhancedContent.subheadline || !enhancedContent.bio || !enhancedContent.stats) {
      console.error("Incomplete AI response:", enhancedContent);
      return new Response(
        JSON.stringify({ error: "AI response missing required fields", partial: enhancedContent }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Content enhanced successfully");

    return new Response(
      JSON.stringify({
        success: true,
        enhanced: enhancedContent,
        original: {
          headline: submission.custom_hero_title || null,
          bio: submission.bio,
          specialty: submission.specialty,
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in enhance-trainer-content:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
