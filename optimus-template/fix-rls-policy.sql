-- ================================================
-- FIX RLS POLICIES FOR stage_bookings
-- Run this in Supabase SQL Editor
-- ================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON public.stage_bookings;
DROP POLICY IF EXISTS "Allow users to read own bookings" ON public.stage_bookings;
DROP POLICY IF EXISTS "Allow service role full access" ON public.stage_bookings;

-- Recreate policies with correct permissions
CREATE POLICY "Allow public insert" ON public.stage_bookings
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to read own bookings" ON public.stage_bookings
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Allow service role full access" ON public.stage_bookings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE public.stage_bookings ENABLE ROW LEVEL SECURITY;
