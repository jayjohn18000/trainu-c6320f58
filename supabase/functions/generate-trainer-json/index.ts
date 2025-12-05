import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { submissionId } = await req.json();

    if (!submissionId) {
      return new Response(
        JSON.stringify({ error: "submissionId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating JSON for submission: ${submissionId}`);

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

    // Generate slug from business name
    const slug = submission.business_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Build trainer JSON following the existing schema
    const trainerJson = {
      slug,
      fullName: submission.full_name,
      brandName: submission.business_name,
      niche: submission.specialty,
      location: submission.location,

      heroHeadline: `Transform Your Life with ${submission.full_name}`,
      heroSubheadline: submission.bio || `Expert ${submission.specialty} coaching to help you reach your goals.`,

      primaryCTA: "Book Consultation",
      primaryCTALink: submission.booking_link || "#contact",

      aboutMe: submission.bio,

      heroImageUrl: submission.profile_photo_url || "/images/demo-hero.png",
      galleryImageUrls: [
        submission.profile_photo_url || "/images/gallery1.webp",
      ].filter(Boolean),

      social: {
        instagram: submission.instagram_url || undefined,
        tiktok: submission.tiktok_url || undefined,
        youtube: submission.youtube_url || undefined,
      },

      programs: programs.map((p: any, index: number) => ({
        id: `program-${index + 1}`,
        title: p.title || `Program ${index + 1}`,
        price: p.price || "Contact for pricing",
        description: p.description || "",
        features: [],
        ctaText: "Learn More",
        ctaLink: submission.booking_link || "#contact",
      })),

      testimonialQuote: submission.testimonial_quote || undefined,
      testimonialName: submission.testimonial_name || undefined,
      testimonialRole: "Client",
      beforeImageUrl: submission.before_photo_url || undefined,
      afterImageUrl: submission.after_photo_url || undefined,

      contactEmail: submission.email,
      contactPhone: submission.phone || undefined,

      themeOverride: undefined,
    };

    // Save to storage bucket
    const fileName = `${slug}.json`;
    const jsonContent = JSON.stringify(trainerJson, null, 2);

    const { error: uploadError } = await supabase.storage
      .from("trainer-json")
      .upload(fileName, jsonContent, {
        contentType: "application/json",
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading JSON:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to save JSON file" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully generated JSON: ${fileName}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        fileName,
        slug,
        json: trainerJson 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-trainer-json:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
