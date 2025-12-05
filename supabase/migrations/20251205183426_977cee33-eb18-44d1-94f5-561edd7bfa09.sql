-- Add color theme columns to trainer_submissions
ALTER TABLE public.trainer_submissions
ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT 'orange',
ADD COLUMN IF NOT EXISTS background_style TEXT DEFAULT 'dark';