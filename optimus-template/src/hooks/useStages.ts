'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Stage {
  id: string;
  city: string;
  postal_code: string;
  full_address: string;
  location_name: string | null;
  date_start: string;
  date_end: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface StagesFilters {
  cities?: string[];
  sortBy?: 'date' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export function useStages(city?: string, filters?: StagesFilters) {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStages = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📍 Loading stages from Supabase...');

      let query = supabase
        .from('stages_recuperation_points')
        .select('*');

      // Filter by city (from URL parameter)
      if (city) {
        query = query.eq('city', city.toUpperCase());
      }

      // Filter by multiple cities (from filter checkboxes)
      if (filters?.cities && filters.cities.length > 0) {
        query = query.in('city', filters.cities.map(c => c.toUpperCase()));
      }

      // Sort
      const sortBy = filters?.sortBy || 'date_start';
      const sortOrder = filters?.sortOrder || 'asc';

      if (sortBy === 'date') {
        query = query.order('date_start', { ascending: sortOrder === 'asc' });
      } else if (sortBy === 'price') {
        query = query.order('price', { ascending: sortOrder === 'asc' });
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw new Error(`Supabase error: ${fetchError.message}`);
      }

      console.log(`✅ Loaded ${data?.length || 0} stages`);
      setStages(data || []);
    } catch (err) {
      console.error('❌ Error loading stages:', err);
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
      setStages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStages();
  }, [city, filters?.cities, filters?.sortBy, filters?.sortOrder]);

  return {
    stages,
    loading,
    error,
    refetch: loadStages,
  };
}

// Get single stage by ID
export function useStage(id: string) {
  const [stage, setStage] = useState<Stage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStage = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('stages_recuperation_points')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setStage(data);
      } catch (err) {
        console.error('Error loading stage:', err);
        setError(err instanceof Error ? err.message : 'Erreur inattendue');
        setStage(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadStage();
    }
  }, [id]);

  return { stage, loading, error };
}
