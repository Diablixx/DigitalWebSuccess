-- ============================================================================
-- OPTIMUS: Stages Recuperation de Points - Dataset with GPS Coordinates  
-- ============================================================================
-- Total: 100 stages across 15 major French cities
-- Date Range: October 2025 - March 2026
-- Price Range: 199-329 euros
-- ============================================================================

-- Create table with latitude/longitude columns
CREATE TABLE IF NOT EXISTS public.stages_recuperation_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  full_address TEXT NOT NULL,
  location_name TEXT,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  price NUMERIC(6,2) NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_stages_city ON stages_recuperation_points(city);
CREATE INDEX IF NOT EXISTS idx_stages_date_start ON stages_recuperation_points(date_start);
CREATE INDEX IF NOT EXISTS idx_stages_price ON stages_recuperation_points(price);
CREATE INDEX IF NOT EXISTS idx_stages_postal_code ON stages_recuperation_points(postal_code);
CREATE INDEX IF NOT EXISTS idx_stages_lat_lng ON stages_recuperation_points(latitude, longitude);

-- Enable Row Level Security
ALTER TABLE public.stages_recuperation_points ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Allow public read access" ON stages_recuperation_points;
CREATE POLICY "Allow public read access" ON stages_recuperation_points
  FOR SELECT TO anon, authenticated
  USING (true);

-- Insert all 100 stages in one statement
INSERT INTO stages_recuperation_points (city, postal_code, full_address, location_name, date_start, date_end, price, latitude, longitude) VALUES
-- MARSEILLE (15 stages)
('MARSEILLE', '13001', '15 rue de la Republique', 'Centre Formation Mediterranee', '2025-10-24', '2025-10-25', 219.00, 43.2965, 5.3698),
('MARSEILLE', '13008', '88 avenue du Prado', 'Auto-Ecole Prado Formation', '2025-10-31', '2025-11-01', 225.00, 43.2695, 5.3889),
('MARSEILLE', '13006', '45 rue Paradis', 'Stage Permis Plus', '2025-11-07', '2025-11-08', 219.00, 43.2920, 5.3782),
('MARSEILLE', '13002', '120 La Canebiere', 'Formation Routiere Marseille', '2025-11-14', '2025-11-15', 229.00, 43.2975, 5.3760),
('MARSEILLE', '13009', '200 boulevard de Saint-Louis', 'Centre Agrement Permis', '2025-11-21', '2025-11-22', 219.00, 43.2536, 5.4005),
('MARSEILLE', '13005', '75 boulevard Sakakini', 'Recuperation Points 13', '2025-11-28', '2025-11-29', 225.00, 43.2998, 5.3892),
('MARSEILLE', '13003', '30 boulevard de la Blancarde', 'Stage Points Mediterranee', '2025-12-05', '2025-12-06', 219.00, 43.3088, 5.3885),
('MARSEILLE', '13010', '155 avenue des Chartreux', 'Formation Conduite Pro', '2025-12-12', '2025-12-13', 229.00, 43.2825, 5.4195),
('MARSEILLE', '13011', '88 boulevard des Liberateurs', 'Auto-Ecole Valentine', '2025-12-19', '2025-12-20', 219.00, 43.2895, 5.4678),
('MARSEILLE', '13004', '55 rue du Docteur Fiolle', 'Centre Stage Securite', '2026-01-09', '2026-01-10', 225.00, 43.3058, 5.4025),
('MARSEILLE', '13012', '200 avenue de Saint-Julien', 'Stage Recuperation Sud', '2026-01-16', '2026-01-17', 219.00, 43.3145, 5.4325),
('MARSEILLE', '13013', '90 boulevard de Saint-Loup', 'Formation Points Permis', '2026-01-23', '2026-01-24', 229.00, 43.3325, 5.4285),
('MARSEILLE', '13014', '45 avenue de Saint-Antoine', 'Stage Conduite Marseille', '2026-01-30', '2026-01-31', 219.00, 43.3395, 5.3795),
('MARSEILLE', '13007', '120 rue de Rome', 'Centre Agrement Sud', '2026-02-06', '2026-02-07', 225.00, 43.2875, 5.3625),
('MARSEILLE', '13015', '75 chemin de la Madrague', 'Formation Securite Route', '2026-02-13', '2026-02-14', 219.00, 43.3595, 5.3595),
-- AIX-EN-PROVENCE (8 stages)
('AIX-EN-PROVENCE', '13100', '25 cours Mirabeau', 'Stage Points Aix', '2025-10-26', '2025-10-27', 235.00, 43.5263, 5.4496),
('AIX-EN-PROVENCE', '13090', '88 avenue Giuseppe Verdi', 'Formation Route Provence', '2025-11-02', '2025-11-03', 239.00, 43.5297, 5.4474),
('AIX-EN-PROVENCE', '13080', '45 rue Emile Zola', 'Centre Permis Aix', '2025-11-09', '2025-11-10', 235.00, 43.5235, 5.4425),
('AIX-EN-PROVENCE', '13100', '120 boulevard Aristide Briand', 'Auto-Ecole Aixoise', '2025-11-16', '2025-11-17', 239.00, 43.5318, 5.4558),
('AIX-EN-PROVENCE', '13100', '60 avenue Victor Hugo', 'Stage Securite Aix', '2025-12-07', '2025-12-08', 235.00, 43.5285, 5.4425),
('AIX-EN-PROVENCE', '13090', '200 route de Galice', 'Formation Conduite 13', '2026-01-11', '2026-01-12', 239.00, 43.5358, 5.4595),
('AIX-EN-PROVENCE', '13100', '75 avenue des Belges', 'Centre Recuperation Aix', '2026-02-08', '2026-02-09', 235.00, 43.5225, 5.4385),
('AIX-EN-PROVENCE', '13080', '30 avenue Henri Malacrida', 'Stage Points Provence', '2026-03-08', '2026-03-09', 239.00, 43.5195, 5.4325),
-- AUBAGNE (6 stages)
('AUBAGNE', '13400', '45 cours Barthelemy', 'Formation Aubagne', '2025-11-03', '2025-11-04', 215.00, 43.2928, 5.5706),
('AUBAGNE', '13400', '88 avenue Antide Boyer', 'Stage Points Pays Aubagne', '2025-11-24', '2025-11-25', 219.00, 43.2895, 5.5685),
('AUBAGNE', '13400', '120 cours Voltaire', 'Centre Permis Aubagne', '2025-12-15', '2025-12-16', 215.00, 43.2945, 5.5725),
('AUBAGNE', '13400', '60 boulevard Jean Jaures', 'Auto-Ecole Aubagnaise', '2026-01-19', '2026-01-20', 219.00, 43.2915, 5.5695),
('AUBAGNE', '13400', '200 avenue Roger Salengro', 'Formation Route 13', '2026-02-16', '2026-02-17', 215.00, 43.2958, 5.5745),
('AUBAGNE', '13400', '75 chemin de Saint-Pierre', 'Stage Recuperation Aubagne', '2026-03-16', '2026-03-17', 219.00, 43.2885, 5.5665),
-- VITROLLES (4 stages)
('VITROLLES', '13127', '30 avenue du 8 Mai 1945', 'Centre Formation Vitrolles', '2025-11-10', '2025-11-11', 215.00, 43.4553, 5.2478),
('VITROLLES', '13127', '88 boulevard Victor Jauffret', 'Stage Points Etang', '2025-12-22', '2025-12-23', 219.00, 43.4525, 5.2525),
('VITROLLES', '13127', '120 avenue Pierre Curie', 'Formation Permis Vitrolles', '2026-02-02', '2026-02-03', 215.00, 43.4585, 5.2445),
('VITROLLES', '13127', '45 rue Jean Monnet', 'Auto-Ecole Vitrollaise', '2026-03-02', '2026-03-03', 219.00, 43.4595, 5.2505),
-- LA CIOTAT (4 stages)
('LA CIOTAT', '13600', '25 boulevard Anatole France', 'Stage Points Ciotat', '2025-11-17', '2025-11-18', 215.00, 43.1747, 5.6064),
('LA CIOTAT', '13600', '60 avenue Fernand Gassion', 'Centre Formation Littoral', '2025-12-29', '2025-12-30', 219.00, 43.1785, 5.6095),
('LA CIOTAT', '13600', '88 rue Marcellin Berthelot', 'Recuperation Points Mer', '2026-02-23', '2026-02-24', 215.00, 43.1725, 5.6125),
('LA CIOTAT', '13600', '120 avenue du President Wilson', 'Formation Securite Ciotat', '2026-03-23', '2026-03-24', 219.00, 43.1715, 5.6085),
-- LYON (12 stages)
('LYON', '69001', '45 rue de la Republique', 'Centre Formation Lyon', '2025-10-25', '2025-10-26', 245.00, 45.7675, 4.8345),
('LYON', '69002', '88 rue Herriot', 'Stage Points Rhone', '2025-11-01', '2025-11-02', 249.00, 45.7598, 4.8318),
('LYON', '69003', '120 cours Lafayette', 'Formation Permis Lyon', '2025-11-08', '2025-11-09', 245.00, 45.7625, 4.8485),
('LYON', '69006', '200 cours Vitton', 'Auto-Ecole Lyonnaise', '2025-11-15', '2025-11-16', 249.00, 45.7695, 4.8558),
('LYON', '69007', '75 avenue Jean Jaures', 'Stage Recuperation 69', '2025-11-22', '2025-11-23', 245.00, 45.7458, 4.8325),
('LYON', '69008', '150 avenue des Freres Lumiere', 'Centre Permis Monplaisir', '2025-11-29', '2025-11-30', 249.00, 45.7385, 4.8695),
('LYON', '69009', '60 rue de la Claire', 'Formation Route Lyon Nord', '2025-12-06', '2025-12-07', 245.00, 45.7785, 4.8045),
('LYON', '69004', '88 boulevard de la Croix-Rousse', 'Stage Points Croix-Rousse', '2025-12-13', '2025-12-14', 249.00, 45.7745, 4.8285),
('LYON', '69005', '45 rue Saint-Jean', 'Centre Formation Vieux Lyon', '2026-01-10', '2026-01-11', 245.00, 45.7625, 4.8265),
('LYON', '69003', '200 rue Paul Bert', 'Auto-Ecole Part-Dieu', '2026-01-17', '2026-01-18', 249.00, 45.7585, 4.8565),
('LYON', '69002', '120 rue de la Bourse', 'Stage Securite Lyon', '2026-02-07', '2026-02-08', 245.00, 45.7625, 4.8365),
('LYON', '69006', '75 boulevard des Belges', 'Formation Conduite Rhone', '2026-02-14', '2026-02-15', 249.00, 45.7745, 4.8625),
-- VILLEURBANNE (4 stages)
('VILLEURBANNE', '69100', '30 cours Emile Zola', 'Stage Points Villeurbanne', '2025-11-04', '2025-11-05', 239.00, 45.7667, 4.8797),
('VILLEURBANNE', '69100', '88 rue Leon Blum', 'Centre Formation Gratte-Ciel', '2025-12-16', '2025-12-17', 245.00, 45.7695, 4.8825),
('VILLEURBANNE', '69100', '120 avenue Henri Barbusse', 'Recuperation Points Est Lyon', '2026-01-27', '2026-01-28', 239.00, 45.7625, 4.8765),
('VILLEURBANNE', '69100', '45 rue du 4 Aout 1789', 'Formation Permis Villeurbanne', '2026-03-10', '2026-03-11', 245.00, 45.7715, 4.8855),
-- PARIS (10 stages)
('PARIS', '75001', '45 rue de Rivoli', 'Centre Formation Paris Centre', '2025-10-27', '2025-10-28', 289.00, 48.8606, 2.3376),
('PARIS', '75008', '88 avenue des Champs-Elysees', 'Stage Points Elite', '2025-11-03', '2025-11-04', 295.00, 48.8698, 2.3078),
('PARIS', '75015', '120 rue de Vaugirard', 'Formation Permis Paris 15', '2025-11-10', '2025-11-11', 289.00, 48.8412, 2.3102),
('PARIS', '75011', '60 boulevard Voltaire', 'Auto-Ecole Republique', '2025-11-17', '2025-11-18', 295.00, 48.8632, 2.3742),
('PARIS', '75017', '200 avenue de Clichy', 'Stage Recuperation Nord Paris', '2025-11-24', '2025-11-25', 289.00, 48.8898, 2.3245),
('PARIS', '75013', '75 avenue Italie', 'Centre Permis Italie', '2025-12-01', '2025-12-02', 295.00, 48.8256, 2.3558),
('PARIS', '75018', '45 rue Ordener', 'Formation Route Montmartre', '2025-12-08', '2025-12-09', 289.00, 48.8912, 2.3498),
('PARIS', '75012', '88 avenue Daumesnil', 'Stage Points Bercy', '2026-01-12', '2026-01-13', 295.00, 48.8412, 2.3892),
('PARIS', '75019', '120 avenue Jean Jaures', 'Recuperation Permis Est', '2026-02-09', '2026-02-10', 289.00, 48.8832, 2.3798),
('PARIS', '75020', '60 boulevard Menilmontant', 'Centre Formation Belleville', '2026-02-23', '2026-02-24', 295.00, 48.8698, 2.3858),
-- TOULOUSE (8 stages)
('TOULOUSE', '31000', '45 rue Alsace Lorraine', 'Centre Formation Toulouse', '2025-10-28', '2025-10-29', 229.00, 43.6045, 1.4442),
('TOULOUSE', '31200', '88 avenue de Saint-Exupery', 'Stage Points Aviation', '2025-11-04', '2025-11-05', 235.00, 43.6295, 1.3665),
('TOULOUSE', '31400', '120 route Espagne', 'Formation Permis Toulouse Sud', '2025-11-18', '2025-11-19', 229.00, 43.5685, 1.4328),
('TOULOUSE', '31100', '60 avenue des Minimes', 'Auto-Ecole Garonne', '2025-12-02', '2025-12-03', 235.00, 43.6058, 1.4238),
('TOULOUSE', '31300', '200 route Saint-Simon', 'Stage Recuperation 31', '2025-12-16', '2025-12-17', 229.00, 43.5995, 1.4085),
('TOULOUSE', '31500', '75 avenue de Lombez', 'Centre Permis Toulouse Ouest', '2026-01-13', '2026-01-14', 235.00, 43.6115, 1.4025),
('TOULOUSE', '31200', '45 grande rue Saint-Michel', 'Formation Route Empalot', '2026-02-10', '2026-02-11', 229.00, 43.5958, 1.4525),
('TOULOUSE', '31000', '88 allee Jean Jaures', 'Stage Points Capitole', '2026-03-10', '2026-03-11', 235.00, 43.6078, 1.4498),
-- NICE (7 stages)
('NICE', '06000', '30 avenue Jean Medecin', 'Centre Formation Cote Azur', '2025-10-29', '2025-10-30', 259.00, 43.7034, 7.2663),
('NICE', '06100', '88 promenade des Anglais', 'Stage Points Baie des Anges', '2025-11-05', '2025-11-06', 265.00, 43.6956, 7.2648),
('NICE', '06300', '120 boulevard Risso', 'Formation Permis Nice Port', '2025-11-19', '2025-11-20', 259.00, 43.7012, 7.2825),
('NICE', '06200', '60 avenue de la Californie', 'Auto-Ecole Riviera', '2025-12-03', '2025-12-04', 265.00, 43.6768, 7.2345),
('NICE', '06100', '200 route de Turin', 'Stage Recuperation Nice Nord', '2025-12-17', '2025-12-18', 259.00, 43.7225, 7.2685),
('NICE', '06000', '75 rue de France', 'Centre Permis Massena', '2026-01-14', '2026-01-15', 265.00, 43.6978, 7.2625),
('NICE', '06300', '45 avenue Malaussena', 'Formation Route Nice Est', '2026-02-11', '2026-02-12', 259.00, 43.7065, 7.2795),
-- NANTES (6 stages)
('NANTES', '44000', '45 rue de Strasbourg', 'Centre Formation Nantes', '2025-10-30', '2025-10-31', 225.00, 47.2184, -1.5536),
('NANTES', '44100', '88 route de Paris', 'Stage Points Loire Atlantique', '2025-11-06', '2025-11-07', 229.00, 47.2334, -1.5678),
('NANTES', '44200', '120 boulevard des Poilus', 'Formation Permis Nantes Nord', '2025-11-20', '2025-11-21', 225.00, 47.2225, -1.5425),
('NANTES', '44300', '60 route Vannes', 'Auto-Ecole Nantaise', '2025-12-04', '2025-12-05', 229.00, 47.2456, -1.5898),
('NANTES', '44000', '200 cours des 50 Otages', 'Stage Recuperation Commerce', '2026-01-15', '2026-01-16', 225.00, 47.2195, -1.5598),
('NANTES', '44100', '75 boulevard de la Prairie', 'Centre Permis Nantes Est', '2026-02-12', '2026-02-13', 229.00, 47.2298, -1.5298),
-- BORDEAUX (6 stages)
('BORDEAUX', '33000', '30 cours Intendance', 'Centre Formation Bordeaux', '2025-10-31', '2025-11-01', 229.00, 44.8378, -0.5792),
('BORDEAUX', '33100', '88 cours de la Somme', 'Stage Points Bastide', '2025-11-07', '2025-11-08', 235.00, 44.8358, -0.5525),
('BORDEAUX', '33200', '120 avenue Thiers', 'Formation Permis Chartrons', '2025-11-21', '2025-11-22', 229.00, 44.8498, -0.5685),
('BORDEAUX', '33800', '60 avenue de la Liberation', 'Auto-Ecole Gironde', '2025-12-05', '2025-12-06', 235.00, 44.8265, -0.5595),
('BORDEAUX', '33000', '200 rue Sainte-Catherine', 'Stage Recuperation Centre', '2026-01-16', '2026-01-17', 229.00, 44.8412, -0.5748),
('BORDEAUX', '33300', '75 avenue Jean Jaures', 'Centre Permis Cauderan', '2026-02-13', '2026-02-14', 235.00, 44.8525, -0.6025),
-- MONTPELLIER (5 stages)
('MONTPELLIER', '34000', '45 rue de la Loge', 'Centre Formation Montpellier', '2025-11-11', '2025-11-12', 219.00, 43.6108, 3.8767),
('MONTPELLIER', '34070', '88 avenue de la Mer', 'Stage Points Odysseum', '2025-11-25', '2025-11-26', 225.00, 43.6045, 3.9198),
('MONTPELLIER', '34090', '120 rue Leon Blum', 'Formation Permis Antigone', '2025-12-09', '2025-12-10', 219.00, 43.6125, 3.8898),
('MONTPELLIER', '34000', '60 boulevard Jeu de Paume', 'Auto-Ecole Herault', '2026-01-20', '2026-01-21', 225.00, 43.6078, 3.8825),
('MONTPELLIER', '34080', '200 avenue Nina Simone', 'Stage Recuperation Port Marianne', '2026-02-17', '2026-02-18', 219.00, 43.5998, 3.9025),
-- STRASBOURG (5 stages)
('STRASBOURG', '67000', '30 place Kleber', 'Centre Formation Strasbourg', '2025-11-12', '2025-11-13', 239.00, 48.5839, 7.7455),
('STRASBOURG', '67100', '88 route du Rhin', 'Stage Points Bas-Rhin', '2025-11-26', '2025-11-27', 245.00, 48.5825, 7.7625),
('STRASBOURG', '67200', '120 avenue de Colmar', 'Formation Permis Neudorf', '2025-12-10', '2025-12-11', 239.00, 48.5658, 7.7565),
('STRASBOURG', '67000', '60 rue du Vieux-Marche-aux-Poissons', 'Auto-Ecole Alsace', '2026-01-21', '2026-01-22', 245.00, 48.5812, 7.7425),
('STRASBOURG', '67300', '200 route de Schirmeck', 'Stage Recuperation Esplanade', '2026-02-18', '2026-02-19', 239.00, 48.5898, 7.7598),
-- LILLE (5 stages)
('LILLE', '59000', '45 rue Nationale', 'Centre Formation Lille', '2025-11-13', '2025-11-14', 235.00, 50.6292, 3.0573),
('LILLE', '59800', '88 avenue du Peuple Belge', 'Stage Points Vauban', '2025-11-27', '2025-11-28', 239.00, 50.6398, 3.0625),
('LILLE', '59777', '120 avenue Willy Brandt', 'Formation Permis Euralille', '2025-12-11', '2025-12-12', 235.00, 50.6365, 3.0765),
('LILLE', '59000', '60 boulevard de la Liberte', 'Auto-Ecole Nord', '2026-01-22', '2026-01-23', 239.00, 50.6258, 3.0695),
('LILLE', '59160', '200 avenue de Bretagne', 'Stage Recuperation Lomme', '2026-02-19', '2026-02-20', 235.00, 50.6498, 3.0125);
