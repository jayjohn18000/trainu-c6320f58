-- Make trainer-json bucket public so trainer pages can load data
UPDATE storage.buckets SET public = true WHERE id = 'trainer-json';

-- Add RLS policy for public read access to trainer-json bucket
CREATE POLICY "Public can read trainer JSON files"
ON storage.objects FOR SELECT
USING (bucket_id = 'trainer-json');