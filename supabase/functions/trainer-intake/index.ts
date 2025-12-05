import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

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
      primary_color: body.primaryColor || 'orange',
      background_style: body.backgroundStyle || 'dark',
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

    // Send confirmation email
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const emailResponse = await resend.emails.send({
          from: "TrainU <hello@notifications.trainu.us>",
          to: [body.email],
          subject: "We received your website request!",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #ff5f26; margin-bottom: 24px;">Thanks for claiming your free trainer website, ${body.fullName}!</h1>
              <p style="color: #333; font-size: 16px; line-height: 1.6;">We've received your submission and our team is already working on your professional trainer website.</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 24px 0;">
                <h3 style="margin-top: 0; color: #333;">What happens next:</h3>
                <ul style="color: #555; line-height: 1.8;">
                  <li>Our team will review your submission within 24 hours</li>
                  <li>We'll create your personalized trainer website</li>
                  <li>You'll receive a preview link to review and approve</li>
                  <li>Once approved, your site goes live!</li>
                </ul>
              </div>
              <p style="color: #333; font-size: 16px;">In the meantime, feel free to reach out if you have any questions.</p>
              <p style="color: #888; font-size: 14px; margin-top: 32px;">— The TrainU Team</p>
            </div>
          `,
        });
        console.log("Confirmation email sent:", emailResponse);

        // Send admin notification email
        const adminNotification = await resend.emails.send({
          from: "TrainU <hello@notifications.trainu.us>",
          to: ["jaylen@trainu.us"],
          subject: `🚀 New Trainer Submission: ${body.businessName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #ff5f26; margin-bottom: 24px;">New Trainer Submission!</h1>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 24px 0;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${body.fullName}</p>
                <p style="margin: 8px 0;"><strong>Business:</strong> ${body.businessName}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${body.email}</p>
                <p style="margin: 8px 0;"><strong>Phone:</strong> ${body.phone}</p>
                <p style="margin: 8px 0;"><strong>Location:</strong> ${body.location}</p>
                <p style="margin: 8px 0;"><strong>Specialty:</strong> ${body.specialty}</p>
              </div>
              <a href="https://trainu.lovable.app/admin/submissions/${data.id}" style="display: inline-block; background: #ff5f26; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Review Submission</a>
            </div>
          `,
        });
        console.log("Admin notification sent:", adminNotification);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.warn("RESEND_API_KEY not configured, skipping emails");
    }

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
