'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import FiltersSidebar from '@/components/stages/FiltersSidebar';
import StageCard from '@/components/stages/StageCard';
import EngagementsSidebar from '@/components/stages/EngagementsSidebar';
import { useStages } from '@/hooks/useStages';
import { getCityCoordinates, hasCityCoordinates } from '@/lib/cityCoordinates';

interface WordPressPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

export default function StagesResultsPage() {
  const params = useParams();
  const city = (params.city as string)?.toUpperCase();
  const citySlug = (params.city as string)?.toLowerCase();

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'proximite'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [cityContent, setCityContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(true);

  // Check if proximity filtering is available for this city
  const cityCoords = city ? getCityCoordinates(city) : null;
  const hasProximity = city ? hasCityCoordinates(city) : false;

  // Fetch ALL proximity stages WITHOUT city filter (for building city list)
  const { stages: allProximityStages, loading, error } = useStages(city, {
    sortBy,
    sortOrder,
    searchCityCoords: cityCoords || undefined,
    radiusKm: 30, // 30km radius for proximity
    // NO cities filter here - we want all proximity results
  });

  // Extract unique cities from UNFILTERED proximity stages (for sidebar filter)
  const availableCities = Array.from(
    new Set(allProximityStages.map((stage) => stage.city))
  ).sort();

  // Apply city filter CLIENT-SIDE for display (keep sidebar cities unchanged)
  const stages = selectedCities.length > 0
    ? allProximityStages.filter((stage) =>
        selectedCities.map(c => c.toUpperCase()).includes(stage.city.toUpperCase())
      )
    : allProximityStages;

  // Fetch city-specific WordPress content via internal API
  useEffect(() => {
    async function fetchCityContent() {
      try {
        setLoadingContent(true);

        console.log(`🔍 Fetching content for city: ${citySlug}`);

        // Fetch from internal API route (bypasses mixed content issues)
        const response = await fetch(`/api/city-content/${citySlug}`);

        if (response.ok) {
          const data = await response.json();
          if (data.content) {
            console.log(`✅ Loaded content for ${citySlug}`);
            setCityContent(data.content);
          } else {
            console.log(`⚠️ No content found for ${citySlug}`);
          }
        } else {
          console.log(`⚠️ No content available for ${citySlug}`);
        }
      } catch (err) {
        console.error('❌ Error fetching city content:', err);
      } finally {
        setLoadingContent(false);
      }
    }

    if (citySlug) {
      fetchCityContent();
    }
  }, [citySlug]);

  const handleSortChange = (newSortBy: 'date' | 'price' | 'proximite', newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="bg-white py-8 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">
              Stage de Récupération de Points {city}
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Retrouvez les stages de récupération de points à {city} agréés par la Préfecture. Récupérez 4 points en 48h.
            </p>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-7">
            {/* Left Sidebar - Filters */}
            <FiltersSidebar
              selectedCities={selectedCities}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onCitiesChange={setSelectedCities}
              onSortChange={handleSortChange}
              showProximitySort={hasProximity}
              availableCities={availableCities}
            />

            {/* Center Column - Results */}
            <main className="flex-1">
              {/* Sort Toolbar */}
              <div className="mb-6 flex items-center gap-3 text-sm text-gray-600">
                <span>Trier par:</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sort-inline"
                    checked={sortBy === 'date'}
                    onChange={() => handleSortChange('date', 'asc')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2">Date</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sort-inline"
                    checked={sortBy === 'price'}
                    onChange={() => handleSortChange('price', 'asc')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2">Prix</span>
                </label>
                {hasProximity && (
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sort-inline"
                      checked={sortBy === 'proximite'}
                      onChange={() => handleSortChange('proximite', 'asc')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2">Proximité</span>
                  </label>
                )}
              </div>

              {/* Results List */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Chargement des stages...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">Erreur: {error}</p>
                </div>
              ) : stages.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="mt-4 text-gray-600">Aucun stage trouvé pour cette ville.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stages.map((stage) => (
                    <StageCard key={stage.id} stage={stage} />
                  ))}
                </div>
              )}
            </main>

            {/* Right Sidebar - Engagements */}
            <EngagementsSidebar />
          </div>
        </div>

        {/* City-Specific WordPress Content */}
        {cityContent && !loadingContent && (
          <div className="bg-gray-50 border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: cityContent }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
