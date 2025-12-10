-- Add stats and AI enhancement tracking columns to trainer_submissions
ALTER TABLE public.trainer_submissions 
ADD COLUMN IF NOT EXISTS client_count text,
ADD COLUMN IF NOT EXISTS rating text,
ADD COLUMN IF NOT EXISTS years_experience text,
ADD COLUMN IF NOT EXISTS ai_enhanced boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_headline text,
ADD COLUMN IF NOT EXISTS ai_subheadline text,
ADD COLUMN IF NOT EXISTS ai_bio text;