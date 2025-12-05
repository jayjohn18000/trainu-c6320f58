import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received trainer intake submission");

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse JSON body (files will be uploaded separately from frontend)
    const body = await req.json();
    console.log("Parsed body fields:", Object.keys(body));

    // Validate required fields
    const requiredFields = ['fullName', 'businessName', 'email', 'phone', 'location', 'bio', 'specialty', 'instagramUrl', 'bookingLink'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missingFields.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.error("Invalid email format:", body.email);
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build programs array from individual program fields
    const programs = [];
    if (body.program1Title) {
      programs.push({
        title: body.program1Title,
        price: body.program1Price || '',
        description: body.program1Description || ''
      });
    }
    if (body.program2Title) {
      programs.push({
        title: body.program2Title,
        price: body.program2Price || '',
        description: body.program2Description || ''
      });
    }
    if (body.program3Title) {
      programs.push({
        title: body.program3Title,
        price: body.program3Price || '',
        description: body.program3Description || ''
      });
    }

    // Prepare submission data
    const submissionData = {
      full_name: body.fullName,
      business_name: body.businessName,
      email: body.email,
      phone: body.phone,
      location: body.location,
      bio: body.bio,
      specialty: body.specialty,
      profile_photo_url: body.profilePhotoUrl || null,
      programs: programs.length > 0 ? programs : null,
      instagram_url: body.instagramUrl,
      tiktok_url: body.tiktokUrl || null,
      youtube_url: body.youtubeUrl || null,
      booking_link: body.bookingLink,
      testimonial_quote: body.testimonialQuote || null,
      testimonial_name: body.testimonialName || null,
      before_photo_url: body.beforePhotoUrl || null,
      after_photo_url: body.afterPhotoUrl || null,
      coaching_style: body.coachingStyle || null,
      wants_custom_domain: body.wantsCustomDomain === true || body.wantsCustomDomain === 'true',
      wants_sms_automations: body.wantsSmsAutomations === true || body.wantsSmsAutomations === 'true',
      wants_ai_assistant: body.wantsAiAssistant === true || body.wantsAiAssistant === 'true',
      wants_courses: body.wantsCourses === true || body.wantsCourses === 'true',
      wants_client_app: body.wantsClientApp === true || body.wantsClientApp === 'true',
      status: 'pending'
    };

    console.log("Inserting submission for:", body.email);

    // Insert into database
    const { data, error } = await supabase
      .from('trainer_submissions')
      .insert(submissionData)
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return new Response(
        JSON.stringify({ error: 'Failed to save submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Submission saved successfully:", data.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Submission received successfully',
        submissionId: data.id 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error processing trainer intake:", error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
