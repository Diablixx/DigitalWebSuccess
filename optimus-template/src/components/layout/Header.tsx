'use client';

import Link from 'next/link';
import { useNavigation } from '@/hooks/useNavigation';
import MegaMenu from './MegaMenu';

export default function Header() {
  const { navigation, loading } = useNavigation();

  return (
    <header className="sticky top-0 z-50">
      {/* Top Thin Bar */}
      <div className="bg-white h-10 flex items-center px-4 border-b border-gray-200">
        <div className="mx-auto max-w-[1200px] w-full flex items-center justify-between">
          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">ProStages</span>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">Permis</span>
          </Link>

          {/* Center Text */}
          <div className="hidden md:block">
            <p className="text-xs uppercase text-gray-500 tracking-wider">
              Stage de Récupération de Points
            </p>
          </div>

          {/* Espace Client Right */}
          <Link
            href="/espace-client"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Espace Client</span>
          </Link>
        </div>
      </div>

      {/* Main Nav Bar (Dark) */}
      <nav className="bg-[#222222] h-14" aria-label="Navigation principale">
        <div className="mx-auto max-w-[1200px] h-full flex items-center justify-between px-4">
          {/* Left: WordPress Navigation */}
          <div className="flex items-center gap-7">
            {loading ? (
              // Loading skeleton
              <div className="flex gap-7">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              // Dynamic navigation from WordPress
              navigation.map((item) =>
                item.hasChildren ? (
                  // Menu with mega menu
                  <MegaMenu
                    key={item.id}
                    title={item.title}
                    href={item.href}
                    children={item.children}
                  />
                ) : (
                  // Simple link
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-white text-sm font-semibold uppercase tracking-wide hover:text-gray-300 transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                )
              )
            )}
          </div>

          {/* Right: Secondary Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/qui-sommes-nous"
              className="text-white text-sm font-semibold uppercase tracking-wide hover:text-gray-300 transition-colors duration-200"
            >
              Qui Sommes-Nous
            </Link>
            <Link
              href="/aide-contact"
              className="bg-[#2b85c9] hover:bg-[#236fae] text-white px-4 py-2 rounded-sm text-sm font-semibold uppercase tracking-wide transition-colors duration-200"
            >
              Aide et Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
