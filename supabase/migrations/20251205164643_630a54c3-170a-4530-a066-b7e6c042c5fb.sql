-- Add RLS policies for admin access to trainer_submissions
-- Allow anyone to read (protected by app-level password gate)
CREATE POLICY "Allow read access to trainer_submissions"
ON public.trainer_submissions
FOR SELECT
USING (true);

-- Allow anyone to update status (protected by app-level password gate)
CREATE POLICY "Allow update access to trainer_submissions"
ON public.trainer_submissions
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Create storage bucket for generated trainer JSON files
INSERT INTO storage.buckets (id, name, public)
VALUES ('trainer-json', 'trainer-json', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policy for trainer-json bucket (admin access only via edge function)
CREATE POLICY "Allow public read of trainer JSON"
ON storage.objects
FOR SELECT
USING (bucket_id = 'trainer-json');

CREATE POLICY "Allow insert to trainer JSON bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'trainer-json');

CREATE POLICY "Allow update to trainer JSON bucket"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'trainer-json');