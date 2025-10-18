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
        router.push(`/stages-recuperation-points-${slug}`);
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
    <div className="relative w-full max-w-[640px] mx-auto">
      <form
        role="search"
        aria-label="Rechercher un stage par ville"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex items-center shadow-md"
      >
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
          aria-label="Saisir une ville"
          className={`
            flex-1 bg-white border border-gray-300 rounded-l-[5px]
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
            text-gray-800 placeholder-gray-400
            ${isLarge ? 'h-[44px] px-[18px] text-[14px]' : 'h-10 px-4 text-sm'}
          `}
          style={{
            borderRight: 'none',
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className={`
            bg-gradient-to-b from-[#e14b3f] to-[#c93a2d] text-white font-semibold rounded-r-[5px]
            hover:from-[#d43f33] hover:to-[#b8342a] active:shadow-inner
            transition-all duration-150 flex items-center justify-center gap-2
            border border-[#bd3a2a]
            ${isLarge ? 'h-[44px] px-4 text-[15px] min-w-[120px]' : 'h-10 px-3 text-sm min-w-[100px]'}
          `}
          style={{
            boxShadow: '0 6px 14px rgba(192, 50, 40, 0.18)',
          }}
          aria-label="Rechercher"
        >
          <svg
            className={isLarge ? 'w-5 h-5' : 'w-4 h-4'}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {isLarge && <span>Rechercher</span>}
        </button>
      </form>

      {/* Autocomplete Suggestions */}
      {showSuggestions && filteredCities.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredCities.map((city, index) => (
            <button
              key={city}
              type="button"
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
