'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { NavigationChild } from '@/hooks/useNavigation';

interface MegaMenuProps {
  title: string;
  href: string;
  children: NavigationChild[];
}

export default function MegaMenu({ title, href, children }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay closing to allow smooth cursor movement
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // No children = regular link (shouldn't happen but safety check)
  if (!children || children.length === 0) {
    return (
      <Link
        href={href}
        className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
      >
        {title}
      </Link>
    );
  }

  return (
    <div
      ref={menuRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parent Menu Item */}
      <Link
        href={href}
        className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 inline-flex items-center gap-1"
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden min-w-[280px]">
            {/* Menu Items */}
            <div className="py-2">
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={child.href}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  {child.title}
                </Link>
              ))}
            </div>

            {/* Optional: Add "View All" link if desired */}
            {children.length > 5 && (
              <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                <Link
                  href={href}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  onClick={() => setIsOpen(false)}
                >
                  Voir tout →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
