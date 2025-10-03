'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCities } from '@/hooks/useCities';

interface CitySearchBarProps {
  placeholder?: string;
  variant?: 'large' | 'small';
  onCitySelect?: (city: string) => void;
}

export default function CitySearchBar({
  placeholder = 'Ville ou CP',
  variant = 'large',
  onCitySelect,
}: CitySearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { cities } = useCities();

  // Filter cities based on query
  const filteredCities = query.length > 0
    ? cities.filter((city) =>
        city.toLowerCase().startsWith(query.toLowerCase())
      )
    : [];

  const handleSearch = (selectedCity?: string) => {
    const cityToSearch = selectedCity || query;
    if (!cityToSearch.trim()) return;

    // Find exact match or use first filtered city
    const city = cities.find(
      (c) => c.toLowerCase() === cityToSearch.toLowerCase()
    ) || filteredCities[0];

    if (city) {
      const slug = city.toLowerCase();
      if (onCitySelect) {
        onCitySelect(city);
      } else {
        router.push(`/stages-recuperation-points/${slug}`);
      }
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredCities.length) {
        handleSearch(filteredCities[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCities.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLarge = variant === 'large';

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            flex-1 border border-gray-300 rounded-l
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${isLarge ? 'h-14 px-5 text-lg' : 'h-10 px-4 text-sm'}
          `}
          style={{ borderRight: 'none' }}
        />
        <button
          onClick={() => handleSearch()}
          className={`
            bg-gradient-to-b from-red-600 to-red-700 text-white rounded-r
            hover:from-red-700 hover:to-red-800 active:shadow-inner
            transition-all duration-150 flex items-center justify-center
            ${isLarge ? 'h-14 w-14' : 'h-10 w-10'}
          `}
          aria-label="Rechercher"
        >
          <svg
            className={isLarge ? 'w-6 h-6' : 'w-5 h-5'}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Autocomplete Suggestions */}
      {showSuggestions && filteredCities.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredCities.map((city, index) => (
            <button
              key={city}
              onClick={() => handleSearch(city)}
              className={`
                w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-100
                ${
                  index === selectedIndex
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-800'
                }
                ${index > 0 ? 'border-t border-gray-100' : ''}
              `}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
