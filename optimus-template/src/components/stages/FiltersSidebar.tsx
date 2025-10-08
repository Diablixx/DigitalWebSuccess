'use client';

import CitySearchBar from './CitySearchBar';

interface FiltersSidebarProps {
  selectedCities: string[];
  sortBy: 'date' | 'price' | 'proximite';
  sortOrder: 'asc' | 'desc';
  onCitiesChange: (cities: string[]) => void;
  onSortChange: (sortBy: 'date' | 'price' | 'proximite', sortOrder: 'asc' | 'desc') => void;
  showProximitySort?: boolean; // Only show proximity option when searching with coordinates
  availableCities?: string[]; // Cities to display in filter (proximity-filtered)
}

export default function FiltersSidebar({
  selectedCities,
  sortBy,
  sortOrder,
  onCitiesChange,
  onSortChange,
  showProximitySort = false,
  availableCities = [],
}: FiltersSidebarProps) {

  const handleCityToggle = (city: string) => {
    if (selectedCities.includes(city)) {
      onCitiesChange(selectedCities.filter((c) => c !== city));
    } else {
      onCitiesChange([...selectedCities, city]);
    }
  };

  const handleSelectAll = () => {
    onCitiesChange([]);
  };

  return (
    <aside className="w-[230px] flex-shrink-0">
      {/* Search Box */}
      <div className="mb-4">
        <CitySearchBar variant="small" placeholder="Ville ou CP" />
      </div>

      {/* Trier par Panel */}
      <div className="mb-4">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white text-xs uppercase font-semibold px-3 py-3 rounded-t">
          Trier par
        </div>
        <div className="bg-white border border-gray-200 rounded-b p-4 space-y-3">
          {/* Date sorting */}
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'date'}
              onChange={() => onSortChange('date', 'asc')}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
              Date
            </span>
          </label>

          {/* Price sorting */}
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'price'}
              onChange={() => onSortChange('price', 'asc')}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
              Prix
            </span>
          </label>

          {/* Proximity sorting - only show when proximity data is available */}
          {showProximitySort && (
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="sort"
                checked={sortBy === 'proximite'}
                onChange={() => onSortChange('proximite', 'asc')}
                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                Proximité
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Filtrer par Panel */}
      <div>
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white text-xs uppercase font-semibold px-3 py-3 rounded-t">
          Filtrer par
        </div>
        <div className="bg-white border border-gray-200 rounded-b p-4 max-h-96 overflow-y-auto">
          {/* All cities checkbox */}
          <label className="flex items-center cursor-pointer group mb-3 pb-3 border-b border-gray-200">
            <input
              type="checkbox"
              checked={selectedCities.length === 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-900 group-hover:text-blue-700">
              Toutes les villes
            </span>
          </label>

          {/* Individual city checkboxes */}
          <div className="space-y-2">
            {availableCities.map((city) => (
              <label key={city} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  onChange={() => handleCityToggle(city)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {city}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
