-- ================================================
-- STAGE BOOKINGS TABLE
-- Stores user booking information for stages
-- ================================================

CREATE TABLE IF NOT EXISTS public.stage_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Link to stage
  stage_id UUID NOT NULL REFERENCES public.stages_recuperation_points(id) ON DELETE CASCADE,

  -- Unique booking reference (e.g., "BK-2025-001234")
  booking_reference TEXT UNIQUE NOT NULL,

  -- Personal information
  civilite TEXT NOT NULL CHECK (civilite IN ('M', 'Mme')),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  date_naissance DATE NOT NULL,

  -- Contact information
  adresse TEXT NOT NULL,
  code_postal TEXT NOT NULL,
  ville TEXT NOT NULL,
  email TEXT NOT NULL,
  email_confirmation TEXT NOT NULL,
  telephone_mobile TEXT NOT NULL,

  -- Optional fields
  guarantee_serenite BOOLEAN DEFAULT false,
  cgv_accepted BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- INDEXES
-- ================================================

CREATE INDEX IF NOT EXISTS idx_stage_bookings_stage_id ON public.stage_bookings(stage_id);
CREATE INDEX IF NOT EXISTS idx_stage_bookings_email ON public.stage_bookings(email);
CREATE INDEX IF NOT EXISTS idx_stage_bookings_booking_ref ON public.stage_bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_stage_bookings_created_at ON public.stage_bookings(created_at);

-- ================================================
-- FUNCTION TO GENERATE BOOKING REFERENCE
-- ================================================

CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
  ref TEXT;
  year TEXT;
  counter INT;
BEGIN
  -- Get current year
  year := TO_CHAR(NOW(), 'YYYY');

  -- Get count of bookings this year + 1
  SELECT COUNT(*) + 1 INTO counter
  FROM stage_bookings
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());

  -- Generate reference like "BK-2025-001234"
  ref := 'BK-' || year || '-' || LPAD(counter::TEXT, 6, '0');

  RETURN ref;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- TRIGGER TO AUTO-GENERATE BOOKING REFERENCE
-- ================================================

CREATE OR REPLACE FUNCTION set_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_reference IS NULL OR NEW.booking_reference = '' THEN
    NEW.booking_reference := generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_booking_reference
BEFORE INSERT ON stage_bookings
FOR EACH ROW
EXECUTE FUNCTION set_booking_reference();

-- ================================================
-- TRIGGER TO UPDATE updated_at
-- ================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_stage_bookings_updated_at
BEFORE UPDATE ON stage_bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

ALTER TABLE public.stage_bookings ENABLE ROW LEVEL SECURITY;

-- Allow public insert (form submissions)
CREATE POLICY "Allow public insert" ON public.stage_bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read their own bookings (by email)
CREATE POLICY "Allow users to read own bookings" ON public.stage_bookings
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- Allow service role full access (for admin)
CREATE POLICY "Allow service role full access" ON public.stage_bookings
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- ================================================
-- COMMENTS
-- ================================================

COMMENT ON TABLE public.stage_bookings IS 'Stores user booking information for driving license points recovery courses';
COMMENT ON COLUMN public.stage_bookings.stage_id IS 'Foreign key linking to stages_recuperation_points table';
COMMENT ON COLUMN public.stage_bookings.booking_reference IS 'Unique booking reference (e.g., BK-2025-001234)';
COMMENT ON COLUMN public.stage_bookings.civilite IS 'Title: M (Monsieur) or Mme (Madame)';
COMMENT ON COLUMN public.stage_bookings.date_naissance IS 'Date of birth';
COMMENT ON COLUMN public.stage_bookings.guarantee_serenite IS 'Optional +25€ guarantee selected';
COMMENT ON COLUMN public.stage_bookings.cgv_accepted IS 'Terms and conditions acceptance (required)';
