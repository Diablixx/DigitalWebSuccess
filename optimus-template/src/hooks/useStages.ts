'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_MYSQL_API_URL || 'http://admin.digitalwebsuccess.com/mysql-api';

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
  price: number | string; // PHP returns as string
  latitude: number | string; // PHP returns as string
  longitude: number | string; // PHP returns as string
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

      console.log('📍 Loading stages from MySQL API...');

      // Build URL with query parameters
      const params = new URLSearchParams();

      if (city) {
        params.append('city', city);
      }

      if (filters?.cities && filters.cities.length > 0) {
        params.append('cities', filters.cities.join(','));
      }

      if (filters?.sortBy) {
        params.append('sortBy', filters.sortBy === 'date' ? 'date_start' : filters.sortBy);
      }

      if (filters?.sortOrder) {
        params.append('sortOrder', filters.sortOrder.toUpperCase());
      }

      const url = `${API_URL}/stages.php?${params.toString()}`;
      console.log('🔗 Fetching:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      let processedStages: Stage[] = result.data || [];

      // Convert string numbers to actual numbers
      processedStages = processedStages.map(stage => ({
        ...stage,
        price: parseFloat(stage.price as string),
        latitude: parseFloat(stage.latitude as string),
        longitude: parseFloat(stage.longitude as string),
      }));

      // Calculate distances if proximity filtering is enabled
      if (filters?.searchCityCoords) {
        const radiusKm = filters.radiusKm || 30; // Default 30km radius
        const { latitude: searchLat, longitude: searchLon } = filters.searchCityCoords;

        processedStages = processedStages
          .map((stage) => {
            const distance = calculateDistance(
              searchLat,
              searchLon,
              stage.latitude as number,
              stage.longitude as number
            );
            return { ...stage, distance_km: Math.round(distance) };
          })
          .filter((stage) => stage.distance_km! <= radiusKm);

        console.log(`🎯 Found ${processedStages.length} stages within ${radiusKm}km`);

        // Sort by proximity if requested
        if (filters.sortBy === 'proximite') {
          processedStages.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
        }
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
  }, [city, filters?.sortBy, filters?.sortOrder, filters?.searchCityCoords, filters?.radiusKm]);

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

        const response = await fetch(`${API_URL}/stages.php?id=${id}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (result.error) {
          throw new Error(result.error);
        }

        // Convert string numbers to actual numbers
        const stageData = result.data;
        setStage({
          ...stageData,
          price: parseFloat(stageData.price),
          latitude: parseFloat(stageData.latitude),
          longitude: parseFloat(stageData.longitude),
        });
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
