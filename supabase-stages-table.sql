-- ============================================
-- Table: stages_recuperation_points
-- Description: Stores points recovery courses (stages de récupération de points)
-- ============================================

CREATE TABLE IF NOT EXISTS public.stages_recuperation_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  full_address TEXT NOT NULL,
  location_name TEXT,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  price NUMERIC(6,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stages_city ON public.stages_recuperation_points(city);
CREATE INDEX IF NOT EXISTS idx_stages_date_start ON public.stages_recuperation_points(date_start);
CREATE INDEX IF NOT EXISTS idx_stages_price ON public.stages_recuperation_points(price);
CREATE INDEX IF NOT EXISTS idx_stages_postal_code ON public.stages_recuperation_points(postal_code);

-- Enable Row Level Security (RLS)
ALTER TABLE public.stages_recuperation_points ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.stages_recuperation_points
  FOR SELECT TO anon, authenticated
  USING (true);

-- ============================================
-- DUMMY DATA - Points Recovery Courses
-- ============================================

INSERT INTO public.stages_recuperation_points (city, postal_code, full_address, location_name, date_start, date_end, price) VALUES
-- MONTPELLIER (34000)
('MONTPELLIER', '34000', '211 rue marius carrieu', 'Centre de Formation Auto-École Plus', '2025-10-24', '2025-10-25', 219.00),
('MONTPELLIER', '34000', '45 avenue de la liberté', 'Institut de Prévention Routière', '2025-11-03', '2025-11-04', 229.00),
('MONTPELLIER', '34000', '178 boulevard henri IV', 'École de Conduite Montpellier', '2025-11-10', '2025-11-11', 219.00),
('MONTPELLIER', '34080', '89 rue des écoles', 'Formation Sécurité Routière', '2025-11-17', '2025-11-18', 239.00),

-- BALARUC-LES-BAINS (34540) - near Montpellier
('BALARUC-LES-BAINS', '34540', '24 avenue pasteur', 'Centre Balaruc Formation', '2025-10-24', '2025-10-25', 219.00),

-- MARSEILLE (13000)
('MARSEILLE', '13001', '156 rue de la république', 'Auto-École Marseille Centre', '2025-10-26', '2025-10-27', 235.00),
('MARSEILLE', '13008', '67 avenue du prado', 'Centre de Récupération Points Prado', '2025-11-02', '2025-11-03', 225.00),
('MARSEILLE', '13009', '234 boulevard michelet', 'Formation Routière Marseille Sud', '2025-11-09', '2025-11-10', 229.00),
('MARSEILLE', '13015', '12 rue saint-jérôme', 'École de Conduite Saint-Jérôme', '2025-11-16', '2025-11-17', 219.00),

-- AVIGNON (84000)
('AVIGNON', '84000', '78 rue de la république', 'Centre Formation Avignon', '2025-10-28', '2025-10-29', 215.00),
('AVIGNON', '84000', '145 avenue monclar', 'Auto-École Provence', '2025-11-05', '2025-11-06', 220.00),
('AVIGNON', '84140', '56 chemin des vignes', 'Institut Sécurité Routière Vaucluse', '2025-11-12', '2025-11-13', 215.00),

-- LYON (69000)
('LYON', '69002', '89 cours charlemagne', 'Centre Formation Lyon Confluence', '2025-11-01', '2025-11-02', 245.00),
('LYON', '69003', '234 rue paul bert', 'Auto-École Part-Dieu', '2025-11-08', '2025-11-09', 239.00),
('LYON', '69006', '45 boulevard des belges', 'Formation Permis Lyon 6', '2025-11-15', '2025-11-16', 249.00),

-- NICE (06000)
('NICE', '06000', '123 promenade des anglais', 'Centre Récupération Points Côte d\'Azur', '2025-10-30', '2025-10-31', 259.00),
('NICE', '06100', '67 avenue jean médecin', 'Auto-École Nice Centre', '2025-11-06', '2025-11-07', 255.00),

-- TOULOUSE (31000)
('TOULOUSE', '31000', '156 allées jean jaurès', 'Formation Sécurité Routière Toulouse', '2025-11-04', '2025-11-05', 229.00),
('TOULOUSE', '31200', '89 route d\'espagne', 'Centre Récupération Points Toulouse Sud', '2025-11-11', '2025-11-12', 225.00),

-- NANTES (44000)
('NANTES', '44000', '45 rue crébillon', 'Auto-École Nantes Centre', '2025-11-07', '2025-11-08', 235.00),

-- BORDEAUX (33000)
('BORDEAUX', '33000', '78 cours de l\'intendance', 'Centre Formation Bordeaux', '2025-11-13', '2025-11-14', 240.00),
('BORDEAUX', '33800', '123 avenue thiers', 'École de Conduite Bordeaux Lac', '2025-11-20', '2025-11-21', 235.00),

-- STRASBOURG (67000)
('STRASBOURG', '67000', '56 rue du faubourg national', 'Formation Routière Strasbourg', '2025-11-14', '2025-11-15', 230.00),

-- LILLE (59000)
('LILLE', '59000', '89 rue nationale', 'Auto-École Lille Centre', '2025-11-18', '2025-11-19', 225.00);

-- Add comment for documentation
COMMENT ON TABLE public.stages_recuperation_points IS 'Stores points recovery courses (stages de récupération de points) with location, dates, and pricing information';
COMMENT ON COLUMN public.stages_recuperation_points.city IS 'City name in uppercase';
COMMENT ON COLUMN public.stages_recuperation_points.postal_code IS 'French postal code (5 digits)';
COMMENT ON COLUMN public.stages_recuperation_points.full_address IS 'Street address without city/postal code';
COMMENT ON COLUMN public.stages_recuperation_points.location_name IS 'Name of the training center or venue';
COMMENT ON COLUMN public.stages_recuperation_points.date_start IS 'Start date of the course (usually Friday)';
COMMENT ON COLUMN public.stages_recuperation_points.date_end IS 'End date of the course (usually Saturday, next day)';
COMMENT ON COLUMN public.stages_recuperation_points.price IS 'Course price in euros';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count total stages
-- SELECT COUNT(*) as total_stages FROM public.stages_recuperation_points;

-- List all unique cities
-- SELECT DISTINCT city FROM public.stages_recuperation_points ORDER BY city;

-- Get stages by city
-- SELECT * FROM public.stages_recuperation_points WHERE city = 'MONTPELLIER' ORDER BY date_start;

-- Get upcoming stages sorted by date
-- SELECT city, full_address, date_start, date_end, price
-- FROM public.stages_recuperation_points
-- WHERE date_start >= CURRENT_DATE
-- ORDER BY date_start;
