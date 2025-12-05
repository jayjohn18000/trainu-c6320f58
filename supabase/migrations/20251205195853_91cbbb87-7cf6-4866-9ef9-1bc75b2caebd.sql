-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow read access to trainer_submissions" ON public.trainer_submissions;
DROP POLICY IF EXISTS "Allow update access to trainer_submissions" ON public.trainer_submissions;

-- Create restrictive policies that only allow service_role access
-- This ensures all admin access must go through edge functions with passcode verification
CREATE POLICY "Service role can read submissions"
ON public.trainer_submissions
FOR SELECT
TO service_role
USING (true);

CREATE POLICY "Service role can update submissions"
ON public.trainer_submissions
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Keep the public INSERT policy for form submissions (this is intentional)
-- The existing "Anyone can submit trainer intake form" policy remains