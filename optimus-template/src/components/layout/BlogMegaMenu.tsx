'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useArticles } from '@/hooks/useArticles';

export default function BlogMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { articles, loading, error } = useArticles();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center space-x-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Blog</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Articles Récents</h3>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">
                <p className="text-sm">Erreur de chargement</p>
                <p className="text-xs mt-1">{error}</p>
              </div>
            ) : articles.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="block p-3 rounded-md hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.read_time}</span>
                      <span>{new Date(article.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                    {article.excerpt && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {article.excerpt.replace(/^##?\s*Introduction\s*\n*/, '')}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <svg
                  className="mx-auto h-8 w-8 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="text-sm">Aucun article publié</p>
                <p className="text-xs mt-1">Les articles apparaîtront ici une fois publiés</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}