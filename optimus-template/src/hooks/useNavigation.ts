'use client';

import { useState, useEffect } from 'react';

export interface NavigationChild {
  id: string;
  title: string;
  slug: string;
  href: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  href: string;
  children: NavigationChild[];
  hasChildren: boolean;
}

interface NavigationResponse {
  success: boolean;
  navigation: NavigationItem[];
  totalPages?: number;
  error?: string;
}

export function useNavigation() {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNavigation = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🧭 Loading navigation from WordPress...');

      const response = await fetch('/api/navigation');

      if (!response.ok) {
        throw new Error(`Navigation API error: ${response.status}`);
      }

      const data: NavigationResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to load navigation');
      }

      console.log('✅ Navigation loaded:', data.navigation.length, 'items');
      setNavigation(data.navigation);
    } catch (err) {
      console.error('❌ Error loading navigation:', err);
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
      setNavigation([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNavigation();

    // Poll for updates every 60 seconds (navigation changes less frequently than articles)
    const interval = setInterval(loadNavigation, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    navigation,
    loading,
    error,
    refetch: loadNavigation,
  };
}
