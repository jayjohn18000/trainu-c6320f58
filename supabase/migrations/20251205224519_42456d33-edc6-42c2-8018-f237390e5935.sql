-- Fix RLS policies on trainer_submissions to restrict access to service role only
-- This prevents direct database queries from the client with the anon key

-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "Service role can read submissions" ON trainer_submissions;
DROP POLICY IF EXISTS "Service role can update submissions" ON trainer_submissions;

-- Create proper restrictive policies that only allow service role access
-- SELECT: Only service role can read submissions (used by edge functions)
CREATE POLICY "Service role can read submissions" ON trainer_submissions
  FOR SELECT USING (auth.role() = 'service_role');

-- UPDATE: Only service role can update submissions (used by edge functions)
CREATE POLICY "Service role can update submissions" ON trainer_submissions
  FOR UPDATE USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Note: The INSERT policy "Anyone can submit trainer intake form" with `true` is correct
-- because the public needs to submit intake forms