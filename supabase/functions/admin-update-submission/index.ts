import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-passcode",
};

// Allowlist of fields that can be updated via admin interface
const ALLOWED_FIELDS = [
  'status',
  'custom_hero_title',
  'specialty',
  'coaching_style',
  'bio',
  'x_url',
  'facebook_url',
  'instagram_url',
  'tiktok_url',
  'youtube_url',
  'booking_link',
  'wants_website_enhancements',
  'wants_social_media_management',
  'wants_done_for_you',
  'wants_custom_domain',
  'wants_sms_automations',
  'wants_ai_assistant',
  'wants_courses',
  'wants_client_app',
  'testimonial_quote',
  'testimonial_name',
  'primary_color',
  'background_style',
];

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
      console.log("Unauthorized: Invalid or missing passcode");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { submissionId, updates } = await req.json();

    if (!submissionId || !updates) {
      return new Response(
        JSON.stringify({ error: "Missing submissionId or updates" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize updates to only include allowed fields
    const sanitizedUpdates: Record<string, unknown> = {};
    for (const field of ALLOWED_FIELDS) {
      if (field in updates) {
        sanitizedUpdates[field] = updates[field];
      }
    }

    if (Object.keys(sanitizedUpdates).length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid fields to update" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sanitized updates:", Object.keys(sanitizedUpdates));

    // Initialize Supabase client with service role for full access
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data, error } = await supabase
      .from("trainer_submissions")
      .update(sanitizedUpdates)
      .eq("id", submissionId)
      .select()
      .single();

    if (error) {
      console.error("Error updating submission:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Submission updated:", submissionId, updates);

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
