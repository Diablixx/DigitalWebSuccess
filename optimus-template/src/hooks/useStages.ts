'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Haversine formula to calculate distance between two coordinates in kilometers
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface Stage {
  id: string;
  city: string;
  postal_code: string;
  full_address: string;
  location_name: string | null;
  date_start: string;
  date_end: string;
  price: number;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  distance_km?: number; // Calculated distance from searched city
}

export interface StagesFilters {
  cities?: string[];
  sortBy?: 'date' | 'price' | 'proximite';
  sortOrder?: 'asc' | 'desc';
  searchCityCoords?: { latitude: number; longitude: number }; // For proximity filtering
  radiusKm?: number; // Search radius in kilometers (default: 30km)
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

      // If proximity filtering is enabled, fetch all stages and filter by distance
      // Otherwise, filter by city as before
      if (filters?.searchCityCoords) {
        // Fetch all stages (or within a broad area) for proximity calculation
        // We'll filter by distance in JavaScript after fetching
        console.log('🌍 Proximity filtering enabled');
      } else {
        // Filter by city (from URL parameter)
        if (city) {
          query = query.eq('city', city.toUpperCase());
        }

        // Filter by multiple cities (from filter checkboxes)
        if (filters?.cities && filters.cities.length > 0) {
          query = query.in('city', filters.cities.map(c => c.toUpperCase()));
        }
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw new Error(`Supabase error: ${fetchError.message}`);
      }

      let processedStages = data || [];

      // Calculate distances if proximity filtering is enabled
      if (filters?.searchCityCoords) {
        const radiusKm = filters.radiusKm || 30; // Default 30km radius
        const { latitude: searchLat, longitude: searchLon } = filters.searchCityCoords;

        processedStages = processedStages
          .map((stage) => {
            const distance = calculateDistance(
              searchLat,
              searchLon,
              stage.latitude,
              stage.longitude
            );
            return { ...stage, distance_km: Math.round(distance) };
          })
          .filter((stage) => stage.distance_km! <= radiusKm);

        console.log(`🎯 Found ${processedStages.length} stages within ${radiusKm}km`);

        // Apply city filter AFTER proximity filter (when specific cities are selected)
        if (filters?.cities && filters.cities.length > 0) {
          processedStages = processedStages.filter((stage) =>
            filters.cities!.map(c => c.toUpperCase()).includes(stage.city.toUpperCase())
          );
          console.log(`📍 Filtered to ${processedStages.length} stages in selected cities`);
        }
      }

      // Sort
      const sortBy = filters?.sortBy || 'date_start';
      const sortOrder = filters?.sortOrder || 'asc';

      if (sortBy === 'date') {
        processedStages.sort((a, b) => {
          const comparison = new Date(a.date_start).getTime() - new Date(b.date_start).getTime();
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      } else if (sortBy === 'price') {
        processedStages.sort((a, b) => {
          const comparison = a.price - b.price;
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      } else if (sortBy === 'proximite' && filters?.searchCityCoords) {
        // Sort by distance (ascending only makes sense for proximity)
        processedStages.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
      }

      console.log(`✅ Loaded ${processedStages.length} stages`);
      setStages(processedStages);
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
  }, [city, filters?.cities, filters?.sortBy, filters?.sortOrder, filters?.searchCityCoords, filters?.radiusKm]);

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
