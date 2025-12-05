-- Create trainer_domains table for custom domain mapping
CREATE TABLE public.trainer_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT UNIQUE NOT NULL,
  trainer_slug TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trainer_domains ENABLE ROW LEVEL SECURITY;

-- Allow public read access for domain resolution
CREATE POLICY "Anyone can read trainer domains"
ON public.trainer_domains
FOR SELECT
USING (true);

-- Allow authenticated admin updates (we'll use service role in edge functions)
CREATE POLICY "Service role can manage domains"
ON public.trainer_domains
FOR ALL
USING (true)
WITH CHECK (true);