import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-passcode",
};

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
      console.log("Unauthorized: Invalid or missing passcode for generate-trainer-json");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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

    const now = new Date().toISOString();

    // Use AI-enhanced content if available, otherwise use original
    const headline = submission.ai_headline || submission.custom_hero_title || `Transform Your Life with ${submission.full_name.split(" ")[0]}`;
    const subheadline = submission.ai_subheadline || submission.bio || `Expert ${submission.specialty} coaching to help you reach your goals.`;
    const bio = submission.ai_bio || submission.bio;

    // Build trainer JSON following the new nested schema with stats
    const trainerJson = {
      slug,
      status: "generated",

      trainer: {
        fullName: submission.full_name,
        businessName: submission.business_name,
        location: submission.location,
        specialty: submission.specialty,
        bio: bio,
        profilePhotoUrl: submission.profile_photo_url || "/images/demo-hero.png",
        galleryImageUrls: submission.gallery_photo_urls || [
          submission.profile_photo_url || "/images/gallery1.webp",
        ].filter(Boolean),
      },

      branding: {
        theme: submission.background_style === "light" ? "light" : "dark",
        primaryColor: submission.primary_color || "orange",
        backgroundStyle: submission.background_style || "dark",
      },

      hero: {
        headline: headline,
        subheadline: subheadline,
        ctaPrimaryLabel: "Book Consultation",
        ctaPrimaryLink: submission.booking_link || "#contact",
        ctaSecondaryLabel: "View Programs",
        ctaSecondaryLink: "#programs",
        backgroundImageUrl: submission.profile_photo_url || "/images/demo-hero.png",
      },

      social: {
        instagram: submission.instagram_url || undefined,
        tiktok: submission.tiktok_url || undefined,
        youtube: submission.youtube_url || undefined,
        x: submission.x_url || undefined,
        facebook: submission.facebook_url || undefined,
        bookingLink: submission.booking_link || undefined,
      },

      programs: programs.map((p: any, index: number) => ({
        id: `program-${index + 1}`,
        title: p.title || `Program ${index + 1}`,
        price: p.price || "Contact",
        priceLabel: p.price ? `$${p.price} / month` : "Contact for pricing",
        description: p.description || "",
        isPrimary: index === 0,
      })),

      results: {
        beforeAfter: submission.before_photo_url && submission.after_photo_url
          ? [{
              id: "ba-1",
              beforeImageUrl: submission.before_photo_url,
              afterImageUrl: submission.after_photo_url,
              label: "Transformation",
            }]
          : [],
      },

      testimonials: submission.testimonial_quote
        ? [{
            id: "t-1",
            quote: submission.testimonial_quote,
            name: submission.testimonial_name || "Client",
            subtitle: "Coaching Client",
          }]
        : [],

      // NEW: Include stats from submission (AI-generated or manual)
      stats: {
        clientCount: submission.client_count || "200+",
        rating: submission.rating || "5.0",
        yearsExperience: submission.years_experience || "5+",
      },

      preferences: {
        coachingStyle: submission.coaching_style || undefined,
        wantsCustomDomain: submission.wants_custom_domain || false,
        wantsSmsAutomations: submission.wants_sms_automations || false,
        wantsAiAssistant: submission.wants_ai_assistant || false,
        wantsCourses: submission.wants_courses || false,
        wantsClientApp: submission.wants_client_app || false,
        wantsWebsiteEnhancements: submission.wants_website_enhancements || false,
        wantsSocialMediaManagement: submission.wants_social_media_management || false,
        wantsDoneForYou: submission.wants_done_for_you || false,
      },

      contact: {
        email: submission.email,
        phone: submission.phone || undefined,
      },

      meta: {
        createdAt: submission.created_at || now,
        updatedAt: now,
        sourceSubmissionId: submission.id,
        notes: null,
        aiEnhanced: submission.ai_enhanced || false,
      },
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

    // Update submission status to "generated"
    await supabase
      .from("trainer_submissions")
      .update({ status: "generated" })
      .eq("id", submissionId);

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
