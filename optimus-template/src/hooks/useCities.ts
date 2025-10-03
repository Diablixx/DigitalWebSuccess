'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useCities() {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🏙️ Loading unique cities from Supabase...');

        const { data, error: fetchError } = await supabase
          .from('stages_recuperation_points')
          .select('city');

        if (fetchError) {
          throw new Error(`Supabase error: ${fetchError.message}`);
        }

        // Extract unique cities and sort alphabetically
        const uniqueCities = Array.from(
          new Set(data?.map((row) => row.city) || [])
        ).sort();

        console.log(`✅ Loaded ${uniqueCities.length} unique cities`);
        setCities(uniqueCities);
      } catch (err) {
        console.error('❌ Error loading cities:', err);
        setError(err instanceof Error ? err.message : 'Erreur inattendue');
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  return {
    cities,
    loading,
    error,
  };
}

// Get filtered cities based on search query
export function useFilteredCities(query: string) {
  const { cities, loading, error } = useCities();

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  return {
    cities: filteredCities,
    loading,
    error,
  };
}
