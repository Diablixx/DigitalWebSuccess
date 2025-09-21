export const defaultSEO = {
  title: 'Optimus - Solutions Marketing Digital & E-commerce',
  description: 'Développez votre présence en ligne avec nos solutions marketing digital innovantes. SEO, content marketing, e-commerce et stratégies personnalisées pour votre croissance.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Optimus',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Optimus - Solutions Marketing Digital',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@optimus_digital',
  },
};

export function generatePageSEO(page: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}) {
  return {
    title: `${page.title} | Optimus`,
    description: page.description,
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${page.slug}`,
    openGraph: {
      ...defaultSEO.openGraph,
      title: page.title,
      description: page.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${page.slug}`,
      images: page.image ? [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ] : defaultSEO.openGraph.images,
    },
  };
}

export function generateBreadcrumbStructuredData(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Optimus',
    description: 'Solutions marketing digital et e-commerce',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Service client',
      availableLanguage: ['French'],
    },
    sameAs: [
      'https://twitter.com/optimus_digital',
      'https://linkedin.com/company/optimus-digital',
    ],
  };
}