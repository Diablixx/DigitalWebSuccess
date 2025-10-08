-- ============================================================================
-- OPTIMUS: Stages Récupération de Points - Comprehensive Dataset with GPS
-- ============================================================================
-- Total: 100 stages across 10-15 major French cities
-- Date Range: October 2025 - March 2026
-- Includes: Latitude/Longitude for proximity-based filtering
-- Price Range: €199-€329
-- ============================================================================

-- Drop existing table if you want a fresh start (CAUTION: deletes all data!)
-- DROP TABLE IF EXISTS public.stages_recuperation_points CASCADE;

-- Create updated table with lat/lng columns
CREATE TABLE IF NOT EXISTS public.stages_recuperation_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  full_address TEXT NOT NULL,
  location_name TEXT,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  price NUMERIC(6,2) NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,  -- GPS latitude
  longitude NUMERIC(10, 7) NOT NULL, -- GPS longitude
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_stages_city ON stages_recuperation_points(city);
CREATE INDEX IF NOT EXISTS idx_stages_date_start ON stages_recuperation_points(date_start);
CREATE INDEX IF NOT EXISTS idx_stages_price ON stages_recuperation_points(price);
CREATE INDEX IF NOT EXISTS idx_stages_postal_code ON stages_recuperation_points(postal_code);
CREATE INDEX IF NOT EXISTS idx_stages_location ON stages_recuperation_points USING GIST (
  ll_to_earth(latitude::float8, longitude::float8)
);

-- Enable Row Level Security
ALTER TABLE public.stages_recuperation_points ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Allow public read access" ON stages_recuperation_points;
CREATE POLICY "Allow public read access" ON stages_recuperation_points
  FOR SELECT TO anon, authenticated
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE public.stages_recuperation_points IS 'Stages de récupération de points avec coordonnées GPS pour filtrage par proximité';
COMMENT ON COLUMN public.stages_recuperation_points.latitude IS 'Latitude GPS (WGS84) pour calcul de distance';
COMMENT ON COLUMN public.stages_recuperation_points.longitude IS 'Longitude GPS (WGS84) pour calcul de distance';

-- ============================================================================
-- INSERT 100 STAGES DATA
-- ============================================================================

-- Clear existing data (optional - remove this line if you want to keep old data)
TRUNCATE TABLE public.stages_recuperation_points;

INSERT INTO public.stages_recuperation_points
(city, postal_code, full_address, location_name, date_start, date_end, price, latitude, longitude)
VALUES

-- ============================================================================
-- MARSEILLE (Bouches-du-Rhône 13) - 15 stages
-- GPS Center: 43.2965, 5.3698
-- ============================================================================
('MARSEILLE', '13001', '55 boulevard de la Libération', 'Centre Formation Vieux-Port', '2025-10-27', '2025-10-28', 209, 43.2995, 5.3817),
('MARSEILLE', '13005', '107 boulevard Sakakini', 'Auto-École Sakakini', '2025-10-15', '2025-10-16', 239, 43.3028, 5.3947),
('MARSEILLE', '13005', '107 boulevard Sakakini', 'Auto-École Sakakini', '2025-10-20', '2025-10-21', 242, 43.3028, 5.3947),
('MARSEILLE', '13005', '107 boulevard Sakakini', 'Auto-École Sakakini', '2025-11-05', '2025-11-06', 231, 43.3028, 5.3947),
('MARSEILLE', '13005', '107 boulevard Sakakini', 'Auto-École Sakakini', '2025-11-19', '2025-11-20', 299, 43.3028, 5.3947),
('MARSEILLE', '13005', '107 boulevard Sakakini', 'Auto-École Sakakini', '2025-12-17', '2025-12-18', 329, 43.3028, 5.3947),
('MARSEILLE', '13011', '6 avenue de Saint Menet', 'Espace Formation Est', '2025-11-12', '2025-11-13', 245, 43.3028, 5.5239),
('MARSEILLE', '13011', '6 avenue de Saint Menet', 'Espace Formation Est', '2025-12-12', '2025-12-13', 199, 43.3028, 5.5239),
('MARSEILLE', '13011', '184 avenue de Saint Menet', 'Centre Pro Saint Menet', '2025-10-17', '2025-10-18', 210, 43.2982, 5.5185),
('MARSEILLE', '13011', '184 avenue de Saint Menet', 'Centre Pro Saint Menet', '2025-11-03', '2025-11-04', 200, 43.2982, 5.5185),
('MARSEILLE', '13011', '184 avenue de Saint Menet', 'Centre Pro Saint Menet', '2025-11-14', '2025-11-15', 200, 43.2982, 5.5185),
('MARSEILLE', '13015', '59 avenue Anne Marie', 'Formation Sud Marseille', '2025-10-17', '2025-10-18', 229, 43.3428, 5.3605),
('MARSEILLE', '13015', '59 avenue Anne Marie', 'Formation Sud Marseille', '2025-11-14', '2025-11-15', 255, 43.3428, 5.3605),
('MARSEILLE', '13015', '59 avenue Anne Marie', 'Formation Sud Marseille', '2025-11-24', '2025-11-25', 200, 43.3428, 5.3605),
('MARSEILLE', '13015', '59 avenue Anne Marie', 'Formation Sud Marseille', '2025-12-01', '2025-12-02', 220, 43.3428, 5.3605),

-- ============================================================================
-- AIX-EN-PROVENCE (Bouches-du-Rhône 13) - 8 stages (~25km from Marseille)
-- GPS: 43.5297, 5.4474
-- ============================================================================
('AIX-EN-PROVENCE', '13090', '135 rue Albert Einstein', 'Centre Formation ZI Les Milles', '2025-10-22', '2025-10-23', 209, 43.5047, 5.3689),
('AIX-EN-PROVENCE', '13090', '135 rue Albert Einstein', 'Centre Formation ZI Les Milles', '2025-11-03', '2025-11-04', 250, 43.5047, 5.3689),
('AIX-EN-PROVENCE', '13090', '135 rue Albert Einstein', 'Centre Formation ZI Les Milles', '2025-11-05', '2025-11-06', 232, 43.5047, 5.3689),
('AIX-EN-PROVENCE', '13090', '135 rue Albert Einstein', 'Centre Formation ZI Les Milles', '2025-11-17', '2025-11-18', 200, 43.5047, 5.3689),
('AIX-EN-PROVENCE', '13090', '135 rue Albert Einstein', 'Centre Formation ZI Les Milles', '2025-11-12', '2025-11-13', 299, 43.5047, 5.3689),
('AIX-EN-PROVENCE', '13090', '135 rue Albert Einstein', 'Centre Formation ZI Les Milles', '2025-12-12', '2025-12-13', 329, 43.5047, 5.3689),
('AIX-EN-PROVENCE', '13100', '40 avenue Henri Malacrida', 'Auto-École Aix Centre', '2025-10-22', '2025-10-23', 209, 43.5220, 5.4395),
('AIX-EN-PROVENCE', '13100', '40 avenue Henri Malacrida', 'Auto-École Aix Centre', '2025-12-15', '2025-12-16', 329, 43.5220, 5.4395),

-- ============================================================================
-- AUBAGNE (Bouches-du-Rhône 13) - 6 stages (~17km from Marseille)
-- GPS: 43.2926, 5.5709
-- ============================================================================
('AUBAGNE', '13400', 'Chemin de la Gauthière', 'Formation Aubagne Centre', '2025-10-13', '2025-10-14', 229, 43.2955, 5.5618),
('AUBAGNE', '13400', 'Chemin de la Gauthière', 'Formation Aubagne Centre', '2025-10-29', '2025-10-30', 200, 43.2955, 5.5618),
('AUBAGNE', '13400', 'Chemin de la Gauthière', 'Formation Aubagne Centre', '2025-11-17', '2025-11-18', 232, 43.2955, 5.5618),
('AUBAGNE', '13400', 'Chemin de la Gauthière', 'Formation Aubagne Centre', '2025-12-03', '2025-12-04', 200, 43.2955, 5.5618),
('AUBAGNE', '13400', 'Chemin de la Gauthière', 'Formation Aubagne Centre', '2025-12-19', '2025-12-20', 200, 43.2955, 5.5618),
('AUBAGNE', '13400', '2435 Route de la Légion', 'Centre Pro Aubagne Est', '2025-10-20', '2025-10-21', 250, 43.2880, 5.5845),

-- ============================================================================
-- VITROLLES (Bouches-du-Rhône 13) - 4 stages (~18km from Marseille)
-- GPS: 43.4553, 5.2478
-- ============================================================================
('VITROLLES', '13127', '24 rue de Madrid', 'Formation Vitrolles Aéroport', '2025-11-03', '2025-11-04', 228, 43.4385, 5.2538),
('VITROLLES', '13127', '24 rue de Madrid', 'Formation Vitrolles Aéroport', '2025-12-03', '2025-12-04', 199, 43.4385, 5.2538),
('VITROLLES', '13127', '24 rue de Madrid', 'Formation Vitrolles Aéroport', '2025-10-26', '2025-10-27', 219, 43.4385, 5.2538),
('VITROLLES', '13127', '24 rue de Madrid', 'Formation Vitrolles Aéroport', '2025-11-23', '2025-11-24', 215, 43.4385, 5.2538),

-- ============================================================================
-- LA CIOTAT (Bouches-du-Rhône 13) - 4 stages (~21km from Marseille)
-- GPS: 43.1747, 5.6062
-- ============================================================================
('LA CIOTAT', '13600', '756 avenue Émile Bodin', 'Centre Formation Ciotat', '2025-10-24', '2025-10-25', 240, 43.1758, 5.6028),
('LA CIOTAT', '13600', '756 avenue Émile Bodin', 'Centre Formation Ciotat', '2025-11-05', '2025-11-06', 238, 43.1758, 5.6028),
('LA CIOTAT', '13600', '756 avenue Émile Bodin', 'Centre Formation Ciotat', '2025-11-17', '2025-11-18', 245, 43.1758, 5.6028),
('LA CIOTAT', '13600', '756 avenue Émile Bodin', 'Centre Formation Ciotat', '2025-11-28', '2025-11-29', 200, 43.1758, 5.6028),

-- ============================================================================
-- LYON (Rhône 69) - 12 stages
-- GPS Center: 45.7640, 4.8357
-- ============================================================================
('LYON', '69002', '45 rue de la Bourse', 'Formation Lyon Presqu\'île', '2025-10-20', '2025-10-21', 245, 45.7640, 4.8323),
('LYON', '69002', '45 rue de la Bourse', 'Formation Lyon Presqu\'île', '2025-11-10', '2025-11-11', 259, 45.7640, 4.8323),
('LYON', '69003', '128 rue Paul Bert', 'Auto-École Part-Dieu', '2025-10-15', '2025-10-16', 239, 45.7598, 4.8564),
('LYON', '69003', '128 rue Paul Bert', 'Auto-École Part-Dieu', '2025-11-05', '2025-11-06', 249, 45.7598, 4.8564),
('LYON', '69006', '234 cours Vitton', 'Centre Formation Foch', '2025-10-24', '2025-10-25', 265, 45.7702, 4.8545),
('LYON', '69006', '234 cours Vitton', 'Centre Formation Foch', '2025-11-14', '2025-11-15', 279, 45.7702, 4.8545),
('LYON', '69007', '89 rue de Gerland', 'Formation Gerland', '2025-10-28', '2025-10-29', 235, 45.7328, 4.8388),
('LYON', '69007', '89 rue de Gerland', 'Formation Gerland', '2025-11-18', '2025-11-19', 255, 45.7328, 4.8388),
('LYON', '69008', '156 avenue des Frères Lumière', 'Centre Monplaisir', '2025-10-30', '2025-10-31', 229, 45.7428, 4.8728),
('LYON', '69008', '156 avenue des Frères Lumière', 'Centre Monplaisir', '2025-11-20', '2025-11-21', 249, 45.7428, 4.8728),
('LYON', '69009', '78 rue de Bourgogne', 'Formation Vaise', '2025-11-06', '2025-11-07', 259, 45.7755, 4.8045),
('LYON', '69009', '78 rue de Bourgogne', 'Formation Vaise', '2025-12-04', '2025-12-05', 269, 45.7755, 4.8045),

-- ============================================================================
-- VILLEURBANNE (Rhône 69) - 4 stages (~5km from Lyon)
-- GPS: 45.7667, 4.8794
-- ============================================================================
('VILLEURBANNE', '69100', '45 cours Émile Zola', 'Centre Formation Gratte-Ciel', '2025-10-22', '2025-10-23', 225, 45.7668, 4.8823),
('VILLEURBANNE', '69100', '45 cours Émile Zola', 'Centre Formation Gratte-Ciel', '2025-11-12', '2025-11-13', 239, 45.7668, 4.8823),
('VILLEURBANNE', '69100', '89 rue Léon Blum', 'Auto-École Villeurbanne', '2025-11-03', '2025-11-04', 229, 45.7625, 4.8895),
('VILLEURBANNE', '69100', '89 rue Léon Blum', 'Auto-École Villeurbanne', '2025-11-24', '2025-11-25', 249, 45.7625, 4.8895),

-- ============================================================================
-- PARIS (Île-de-France 75) - 10 stages
-- GPS Center: 48.8566, 2.3522
-- ============================================================================
('PARIS', '75001', '12 rue du Louvre', 'Formation Paris Centre', '2025-10-16', '2025-10-17', 299, 48.8606, 2.3416),
('PARIS', '75011', '89 boulevard Voltaire', 'Centre République', '2025-10-23', '2025-10-24', 289, 48.8584, 2.3775),
('PARIS', '75011', '89 boulevard Voltaire', 'Centre République', '2025-11-06', '2025-11-07', 299, 48.8584, 2.3775),
('PARIS', '75012', '156 avenue Daumesnil', 'Formation Bercy', '2025-10-28', '2025-10-29', 279, 48.8395, 2.3865),
('PARIS', '75013', '45 avenue d\'Italie', 'Centre Place d\'Italie', '2025-11-10', '2025-11-11', 295, 48.8279, 2.3558),
('PARIS', '75015', '234 rue de Vaugirard', 'Formation Montparnasse', '2025-10-21', '2025-10-22', 309, 48.8388, 2.3075),
('PARIS', '75015', '234 rue de Vaugirard', 'Formation Montparnasse', '2025-11-18', '2025-11-19', 319, 48.8388, 2.3075),
('PARIS', '75017', '78 avenue de Clichy', 'Centre Batignolles', '2025-10-30', '2025-10-31', 289, 48.8845, 2.3208),
('PARIS', '75018', '156 boulevard de la Chapelle', 'Formation Montmartre', '2025-11-13', '2025-11-14', 279, 48.8895, 2.3598),
('PARIS', '75019', '89 avenue Jean Jaurès', 'Centre Buttes Chaumont', '2025-11-27', '2025-11-28', 299, 48.8808, 2.3728),

-- ============================================================================
-- TOULOUSE (Haute-Garonne 31) - 8 stages
-- GPS Center: 43.6047, 1.4442
-- ============================================================================
('TOULOUSE', '31000', '45 allées Jean Jaurès', 'Formation Capitole', '2025-10-17', '2025-10-18', 235, 43.6058, 1.4497),
('TOULOUSE', '31000', '45 allées Jean Jaurès', 'Formation Capitole', '2025-11-07', '2025-11-08', 245, 43.6058, 1.4497),
('TOULOUSE', '31200', '89 avenue de Muret', 'Centre Compans', '2025-10-24', '2025-10-25', 229, 43.5928, 1.4288),
('TOULOUSE', '31200', '89 avenue de Muret', 'Centre Compans', '2025-11-14', '2025-11-15', 239, 43.5928, 1.4288),
('TOULOUSE', '31300', '156 route d\'Albi', 'Formation Minimes', '2025-10-29', '2025-10-30', 249, 43.6228, 1.4285),
('TOULOUSE', '31300', '156 route d\'Albi', 'Formation Minimes', '2025-11-19', '2025-11-20', 259, 43.6228, 1.4285),
('TOULOUSE', '31400', '234 route de Narbonne', 'Centre Rangueil', '2025-11-04', '2025-11-05', 225, 43.5658, 1.4628),
('TOULOUSE', '31500', '78 avenue de Lombez', 'Formation Saint-Martin', '2025-11-21', '2025-11-22', 235, 43.5955, 1.4138),

-- ============================================================================
-- NICE (Alpes-Maritimes 06) - 7 stages
-- GPS Center: 43.7102, 7.2620
-- ============================================================================
('NICE', '06000', '45 avenue Jean Médecin', 'Formation Nice Centre', '2025-10-18', '2025-10-19', 269, 43.7048, 7.2663),
('NICE', '06000', '45 avenue Jean Médecin', 'Formation Nice Centre', '2025-11-08', '2025-11-09', 279, 43.7048, 7.2663),
('NICE', '06100', '89 boulevard Carnot', 'Centre Libération', '2025-10-25', '2025-10-26', 255, 43.7228, 7.2558),
('NICE', '06100', '89 boulevard Carnot', 'Centre Libération', '2025-11-15', '2025-11-16', 265, 43.7228, 7.2558),
('NICE', '06200', '156 avenue de la Californie', 'Formation Nice Ouest', '2025-10-31', '2025-11-01', 289, 43.6828, 7.2258),
('NICE', '06300', '234 boulevard du Mercantour', 'Centre Riquier', '2025-11-12', '2025-11-13', 275, 43.7158, 7.2895),
('NICE', '06300', '234 boulevard du Mercantour', 'Centre Riquier', '2025-11-26', '2025-11-27', 285, 43.7158, 7.2895),

-- ============================================================================
-- NANTES (Loire-Atlantique 44) - 6 stages
-- GPS Center: 47.2184, -1.5536
-- ============================================================================
('NANTES', '44000', '12 cours des 50 Otages', 'Formation Nantes Centre', '2025-10-19', '2025-10-20', 239, 47.2128, -1.5606),
('NANTES', '44000', '12 cours des 50 Otages', 'Formation Nantes Centre', '2025-11-09', '2025-11-10', 249, 47.2128, -1.5606),
('NANTES', '44100', '89 boulevard des Belges', 'Centre Beaujoire', '2025-10-26', '2025-10-27', 229, 47.2398, -1.5228),
('NANTES', '44200', '156 route de Rennes', 'Formation Saint-Herblain', '2025-11-02', '2025-11-03', 235, 47.2268, -1.6286),
('NANTES', '44300', '234 rue Paul Bellamy', 'Centre Doulon', '2025-11-16', '2025-11-17', 245, 47.2428, -1.5088),
('NANTES', '44300', '234 rue Paul Bellamy', 'Centre Doulon', '2025-12-07', '2025-12-08', 255, 47.2428, -1.5088),

-- ============================================================================
-- BORDEAUX (Gironde 33) - 6 stages
-- GPS Center: 44.8378, -0.5792
-- ============================================================================
('BORDEAUX', '33000', '45 cours de l\'Intendance', 'Formation Bordeaux Centre', '2025-10-20', '2025-10-21', 249, 44.8415, -0.5768),
('BORDEAUX', '33000', '45 cours de l\'Intendance', 'Formation Bordeaux Centre', '2025-11-10', '2025-11-11', 259, 44.8415, -0.5768),
('BORDEAUX', '33100', '89 avenue Thiers', 'Centre Bastide', '2025-10-27', '2025-10-28', 235, 44.8498, -0.5548),
('BORDEAUX', '33200', '156 avenue du Médoc', 'Formation Caudéran', '2025-11-03', '2025-11-04', 245, 44.8528, -0.6058),
('BORDEAUX', '33300', '234 rue Fondaudège', 'Centre Grand Parc', '2025-11-17', '2025-11-18', 239, 44.8618, -0.5768),
('BORDEAUX', '33800', '78 cours de la Libération', 'Formation Talence', '2025-11-24', '2025-11-25', 255, 44.8078, -0.5898),

-- ============================================================================
-- MONTPELLIER (Hérault 34) - 5 stages
-- GPS Center: 43.6108, 3.8767
-- ============================================================================
('MONTPELLIER', '34000', '45 rue de la Loge', 'Formation Montpellier Centre', '2025-10-21', '2025-10-22', 229, 43.6088, 3.8798),
('MONTPELLIER', '34000', '45 rue de la Loge', 'Formation Montpellier Centre', '2025-11-11', '2025-11-12', 239, 43.6088, 3.8798),
('MONTPELLIER', '34070', '89 avenue de la Justice de Castelnau', 'Centre Antigone', '2025-10-28', '2025-10-29', 219, 43.6068, 3.8958),
('MONTPELLIER', '34080', '156 rue de la Galéra', 'Formation Port Marianne', '2025-11-18', '2025-11-19', 235, 43.5958, 3.9098),
('MONTPELLIER', '34090', '234 avenue de Lodève', 'Centre Celleneuve', '2025-11-25', '2025-11-26', 245, 43.6228, 3.8428),

-- ============================================================================
-- STRASBOURG (Bas-Rhin 67) - 5 stages
-- GPS Center: 48.5734, 7.7521
-- ============================================================================
('STRASBOURG', '67000', '45 rue du Vieux Marché aux Vins', 'Formation Strasbourg Centre', '2025-10-22', '2025-10-23', 239, 48.5808, 7.7468),
('STRASBOURG', '67000', '45 rue du Vieux Marché aux Vins', 'Formation Strasbourg Centre', '2025-11-12', '2025-11-13', 249, 48.5808, 7.7468),
('STRASBOURG', '67100', '89 route du Polygone', 'Centre Meinau', '2025-10-29', '2025-10-30', 229, 48.5588, 7.7558),
('STRASBOURG', '67200', '156 route du Rhin', 'Formation Neudorf', '2025-11-19', '2025-11-20', 239, 48.5728, 7.7748),
('STRASBOURG', '67300', '234 route de Schirmeck', 'Centre Cronenbourg', '2025-12-03', '2025-12-04', 245, 48.5968, 7.7228),

-- ============================================================================
-- LILLE (Nord 59) - 5 stages
-- GPS Center: 50.6292, 3.0573
-- ============================================================================
('LILLE', '59000', '45 rue Faidherbe', 'Formation Lille Centre', '2025-10-23', '2025-10-24', 235, 50.6328, 3.0633),
('LILLE', '59000', '45 rue Faidherbe', 'Formation Lille Centre', '2025-11-13', '2025-11-14', 245, 50.6328, 3.0633),
('LILLE', '59100', '89 rue du Molinel', 'Centre Wazemmes', '2025-10-30', '2025-10-31', 225, 50.6198, 3.0548),
('LILLE', '59160', '156 avenue de Dunkerque', 'Formation Lomme', '2025-11-20', '2025-11-21', 239, 50.6448, 3.0128),
('LILLE', '59800', '234 avenue de la République', 'Centre Hellemmes', '2025-12-04', '2025-12-05', 249, 50.6268, 3.1118);

-- ============================================================================
-- END OF DATA INSERTION
-- ============================================================================

-- Verify the data was inserted correctly
SELECT
  COUNT(*) as total_stages,
  COUNT(DISTINCT city) as total_cities,
  MIN(price) as min_price,
  MAX(price) as max_price,
  MIN(date_start) as earliest_date,
  MAX(date_start) as latest_date
FROM public.stages_recuperation_points;

-- Show distribution by city
SELECT city, COUNT(*) as stage_count, ROUND(AVG(price), 2) as avg_price
FROM public.stages_recuperation_points
GROUP BY city
ORDER BY stage_count DESC, city;

-- ============================================================================
-- USAGE NOTES:
-- ============================================================================
-- 1. Copy this entire SQL file
-- 2. Go to Supabase Dashboard → SQL Editor
-- 3. Click "New Query"
-- 4. Paste this SQL
-- 5. Click "Run" or press Ctrl+Enter
-- 6. Verify results show 100 total stages across cities
--
-- To calculate distance between two points (Haversine formula):
-- SELECT earth_distance(
--   ll_to_earth(lat1, lon1),
--   ll_to_earth(lat2, lon2)
-- ) / 1000 as distance_km;
--
-- Example: Find all stages within 30km of Marseille center:
-- SELECT *, earth_distance(
--   ll_to_earth(43.2965, 5.3698),
--   ll_to_earth(latitude, longitude)
-- ) / 1000 as distance_km
-- FROM stages_recuperation_points
-- WHERE earth_distance(
--   ll_to_earth(43.2965, 5.3698),
--   ll_to_earth(latitude, longitude)
-- ) <= 30000
-- ORDER BY distance_km;
-- ============================================================================
