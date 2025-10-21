'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_MYSQL_API_URL || 'https://admin.digitalwebsuccess.com/mysql-api';

export function useCities() {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🏙️ Loading unique cities from MySQL API...');

        const response = await fetch(`${API_URL}/stages.php?action=cities`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.error) {
          throw new Error(result.error);
        }

        const uniqueCities = result.data || [];

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
