'use client';

import Link from 'next/link';
import { useState } from 'react';
import BlogMegaMenu from './BlogMegaMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Formations', href: '/formations' },
    { name: 'Ressources', href: '/ressources' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
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
          <div className="ml-10 space-x-4 hidden lg:block">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <BlogMegaMenu />
          </div>
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
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {link.name}
            </Link>
          ))}
          <div className="w-full flex justify-center mt-2">
            <BlogMegaMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}