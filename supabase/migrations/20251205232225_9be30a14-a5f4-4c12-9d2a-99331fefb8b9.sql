-- Add new columns for additional form fields
ALTER TABLE public.trainer_submissions
  ADD COLUMN IF NOT EXISTS custom_hero_title text,
  ADD COLUMN IF NOT EXISTS x_url text,
  ADD COLUMN IF NOT EXISTS facebook_url text,
  ADD COLUMN IF NOT EXISTS gallery_photo_urls jsonb,
  ADD COLUMN IF NOT EXISTS wants_website_enhancements boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS wants_social_media_management boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS wants_done_for_you boolean DEFAULT false;