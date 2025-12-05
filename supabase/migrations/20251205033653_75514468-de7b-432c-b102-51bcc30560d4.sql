-- Create trainer_submissions table
CREATE TABLE public.trainer_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  -- Identity
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  
  -- Branding
  bio TEXT NOT NULL,
  specialty TEXT NOT NULL,
  profile_photo_url TEXT,
  
  -- Programs (JSON for flexibility)
  programs JSONB,
  
  -- Social & Booking
  instagram_url TEXT,
  tiktok_url TEXT,
  youtube_url TEXT,
  booking_link TEXT,
  
  -- Testimonials
  testimonial_quote TEXT,
  testimonial_name TEXT,
  before_photo_url TEXT,
  after_photo_url TEXT,
  
  -- Advanced Options
  coaching_style TEXT,
  wants_custom_domain BOOLEAN DEFAULT false,
  wants_sms_automations BOOLEAN DEFAULT false,
  wants_ai_assistant BOOLEAN DEFAULT false,
  wants_courses BOOLEAN DEFAULT false,
  wants_client_app BOOLEAN DEFAULT false,
  
  -- Status tracking
  status TEXT DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE public.trainer_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can submit the form)
CREATE POLICY "Anyone can submit trainer intake form"
ON public.trainer_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only service role can read/update/delete (for admin access via edge functions)
-- No select policy for anon/authenticated means they can't read submissions

-- Create storage bucket for trainer submission files
INSERT INTO storage.buckets (id, name, public)
VALUES ('trainer-submissions', 'trainer-submissions', true);

-- Storage policies - anyone can upload to trainer-submissions bucket
CREATE POLICY "Anyone can upload trainer submission files"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'trainer-submissions');

-- Public read access for uploaded files
CREATE POLICY "Public read access for trainer submission files"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'trainer-submissions');