import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ========== Rate Limiting ==========
// Simple in-memory rate limiter (resets on cold start, which is acceptable for edge functions)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS_PER_IP = 3; // Max 3 submissions per IP per hour

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIP(req: Request): string {
  // Try common headers for client IP (in order of reliability)
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;
  
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first (original client)
    return xForwardedFor.split(',')[0].trim();
  }
  
  const xRealIP = req.headers.get('x-real-ip');
  if (xRealIP) return xRealIP;
  
  // Fallback - not ideal but prevents null
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  
  // Clean up old entries periodically (simple cleanup on each request)
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.firstRequest > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  if (!entry) {
    // First request from this IP
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return { allowed: true };
  }
  
  // Check if window has expired
  if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    // Reset the window
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return { allowed: true };
  }
  
  // Within window - check count
  if (entry.count >= MAX_SUBMISSIONS_PER_IP) {
    const retryAfterSeconds = Math.ceil((entry.firstRequest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }
  
  // Increment count
  entry.count++;
  rateLimitStore.set(ip, entry);
  return { allowed: true };
}

// Validation constants
const MAX_LENGTHS = {
  fullName: 100,
  businessName: 100,
  email: 255,
  phone: 30,
  location: 200,
  bio: 1500,
  specialty: 200,
  testimonialQuote: 500,
  testimonialName: 100,
  coachingStyle: 500,
  programTitle: 100,
  programPrice: 50,
  programDescription: 500,
  customHeroTitle: 200,
};

// URL validation pattern (must start with http:// or https://)
const urlPattern = /^https?:\/\/.+/i;

// Validate URL format
function isValidUrl(url: string): boolean {
  return urlPattern.test(url);
}

// Validate string length
function validateLength(value: string | undefined | null, fieldName: string, maxLength: number): string | null {
  if (value && value.length > maxLength) {
    return `${fieldName} exceeds maximum length of ${maxLength} characters`;
  }
  return null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ========== Rate Limiting Check ==========
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many submissions. Please try again later.',
          retryAfterSeconds: rateLimitResult.retryAfterSeconds 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfterSeconds)
          } 
        }
      );
    }
    
    console.log("Received trainer intake submission from IP:", clientIP);

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

    // Validate field lengths
    const lengthErrors: string[] = [];
    
    const lengthChecks = [
      validateLength(body.fullName, 'Full name', MAX_LENGTHS.fullName),
      validateLength(body.businessName, 'Business name', MAX_LENGTHS.businessName),
      validateLength(body.email, 'Email', MAX_LENGTHS.email),
      validateLength(body.phone, 'Phone', MAX_LENGTHS.phone),
      validateLength(body.location, 'Location', MAX_LENGTHS.location),
      validateLength(body.bio, 'Bio', MAX_LENGTHS.bio),
      validateLength(body.specialty, 'Specialty', MAX_LENGTHS.specialty),
      validateLength(body.testimonialQuote, 'Testimonial quote', MAX_LENGTHS.testimonialQuote),
      validateLength(body.testimonialName, 'Testimonial name', MAX_LENGTHS.testimonialName),
      validateLength(body.coachingStyle, 'Coaching style', MAX_LENGTHS.coachingStyle),
      validateLength(body.customHeroTitle, 'Custom hero title', MAX_LENGTHS.customHeroTitle),
      validateLength(body.program1Title, 'Program 1 title', MAX_LENGTHS.programTitle),
      validateLength(body.program1Price, 'Program 1 price', MAX_LENGTHS.programPrice),
      validateLength(body.program1Description, 'Program 1 description', MAX_LENGTHS.programDescription),
      validateLength(body.program2Title, 'Program 2 title', MAX_LENGTHS.programTitle),
      validateLength(body.program2Price, 'Program 2 price', MAX_LENGTHS.programPrice),
      validateLength(body.program2Description, 'Program 2 description', MAX_LENGTHS.programDescription),
      validateLength(body.program3Title, 'Program 3 title', MAX_LENGTHS.programTitle),
      validateLength(body.program3Price, 'Program 3 price', MAX_LENGTHS.programPrice),
      validateLength(body.program3Description, 'Program 3 description', MAX_LENGTHS.programDescription),
    ];

    lengthChecks.forEach(error => {
      if (error) lengthErrors.push(error);
    });

    if (lengthErrors.length > 0) {
      console.error("Field length validation errors:", lengthErrors);
      return new Response(
        JSON.stringify({ error: lengthErrors[0] }), // Return first error for simplicity
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL formats for social links
    const urlFields = [
      { field: 'instagramUrl', name: 'Instagram URL', value: body.instagramUrl },
      { field: 'tiktokUrl', name: 'TikTok URL', value: body.tiktokUrl },
      { field: 'youtubeUrl', name: 'YouTube URL', value: body.youtubeUrl },
      { field: 'bookingLink', name: 'Booking link', value: body.bookingLink },
      { field: 'xUrl', name: 'X (Twitter) URL', value: body.xUrl },
      { field: 'facebookUrl', name: 'Facebook URL', value: body.facebookUrl },
    ];

    for (const urlField of urlFields) {
      if (urlField.value && !isValidUrl(urlField.value)) {
        console.error(`Invalid URL format for ${urlField.name}:`, urlField.value);
        return new Response(
          JSON.stringify({ error: `${urlField.name} must be a valid URL starting with http:// or https://` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
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
      status: 'pending',
      // New fields
      custom_hero_title: body.customHeroTitle?.trim() || null,
      x_url: body.xUrl || null,
      facebook_url: body.facebookUrl || null,
      gallery_photo_urls: body.galleryPhotoUrls || null,
      wants_website_enhancements: body.wantsWebsiteEnhancements === true || body.wantsWebsiteEnhancements === 'true',
      wants_social_media_management: body.wantsSocialMediaManagement === true || body.wantsSocialMediaManagement === 'true',
      wants_done_for_you: body.wantsDoneForYou === true || body.wantsDoneForYou === 'true',
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

    // ========== GHL Integration ==========
    // Push new lead to GoHighLevel (LeadConnector API) for CRM tracking
    const ghlPat = Deno.env.get('GHL_SUB_ACCOUNT_PAT');
    const ghlLocationId = Deno.env.get('GHL_LOCATION_ID');
    
    if (ghlPat && ghlLocationId) {
      try {
        // Split full_name into firstName and lastName
        const nameParts = body.fullName.trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const ghlContactPayload = {
          locationId: ghlLocationId,
          firstName,
          lastName,
          email: body.email,
          phone: body.phone,
          tags: ["TrainU Website Lead", "Free Website Funnel", "my.trainu.us"],
        };

        console.log("Sending contact to GHL:", { email: body.email, firstName, lastName });

        const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ghlPat}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(ghlContactPayload),
        });

        const ghlResponseText = await ghlResponse.text();
        
        if (ghlResponse.ok) {
          console.log("GHL contact created successfully:", ghlResponseText);
        } else {
          // Log error but don't fail the submission
          console.error("GHL API error:", {
            status: ghlResponse.status,
            statusText: ghlResponse.statusText,
            body: ghlResponseText,
          });
        }
      } catch (ghlError) {
        // Log error but don't fail the submission
        console.error("GHL integration failed:", ghlError);
      }
    } else {
      console.warn("GHL credentials not configured, skipping CRM integration");
    }

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
