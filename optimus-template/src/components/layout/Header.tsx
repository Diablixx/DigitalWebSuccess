'use client';

import Link from 'next/link';
import { useNavigation } from '@/hooks/useNavigation';
import MegaMenu from './MegaMenu';

export default function Header() {
  const { navigation, loading } = useNavigation();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Optimus</span>
              <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
            </Link>
            <div className="ml-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Optimus
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="ml-10 space-x-4 hidden lg:flex items-center">
            {loading ? (
              // Loading skeleton
              <div className="flex space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              // Dynamic navigation from WordPress
              navigation.map((item) =>
                item.hasChildren ? (
                  // Menu with mega menu (Actualités, Tutos, Contenu)
                  <MegaMenu
                    key={item.id}
                    title={item.title}
                    href={item.href}
                    children={item.children}
                  />
                ) : (
                  // Simple link (Accueil)
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                )
              )
            )}
          </div>

          {/* Right side actions */}
          <div className="ml-4 flex items-center space-x-4">
            <Link
              href="/login"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Connexion
            </Link>
            <Link
              href="/offre-pdf"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Offre PDF
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-wrap justify-center gap-4 py-4 lg:hidden">
          {loading ? (
            <div className="flex space-x-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            navigation.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <Link
                  href={item.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.title}
                </Link>
                {/* Mobile: Show children as dropdown or simple list */}
                {item.hasChildren && (
                  <div className="mt-2 flex flex-col items-center space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        className="text-sm text-gray-400 hover:text-gray-600"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </nav>
    </header>
  );
}