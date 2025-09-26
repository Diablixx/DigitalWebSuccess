import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { generateOrganizationStructuredData } from '@/lib/seo';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {
  const organizationData = generateOrganizationStructuredData();

  return (
    <>
      <SEOHead
        structuredData={[organizationData]}
      />
      <div className={`min-h-screen flex flex-col ${className}`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}