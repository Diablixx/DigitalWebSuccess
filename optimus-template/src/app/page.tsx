import Layout from '@/components/layout/Layout';
import CitySearchBar from '@/components/stages/CitySearchBar';

interface WordPressPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  status: string;
}

interface PageContent {
  above: string;
  below: string;
}

async function getHomePage(): Promise<WordPressPage | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://admin.digitalwebsuccess.com/wp-json/wp/v2';

    // Fetch the "Homepage" page from WordPress
    const response = await fetch(`${apiUrl}/pages?slug=homepage&status=publish`, {
      next: { revalidate: 30 }, // Revalidate every 30 seconds
    });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status}`);
      return null;
    }

    const pages: WordPressPage[] = await response.json();

    if (pages.length === 0) {
      return null;
    }

    return pages[0];
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

function splitContent(html: string): PageContent {
  // Try multiple delimiters (WordPress-friendly text markers)
  const delimiters = [
    '[SEARCH_BAR]',
    '***SEARCH_BAR***',
    '<!-- SEARCH_BAR -->',
    '&lt;!-- SEARCH_BAR --&gt;', // WordPress HTML entities
  ];

  let parts: string[] = [html];

  // Find which delimiter exists in the content
  for (const delimiter of delimiters) {
    if (html.includes(delimiter)) {
      parts = html.split(delimiter);
      break;
    }
  }

  return {
    above: parts[0] || '',
    below: parts[1] || '',
  };
}

export async function generateMetadata() {
  const page = await getHomePage();

  if (!page) {
    return {
      title: 'ProStages - Stage de Récupération de Points',
      description: 'Récupérez 4 points en 48h - Stages agréés par la Préfecture',
    };
  }

  return {
    title: `${page.title.rendered} | ProStages`,
    description: page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) || 'Stage de Récupération de Points',
  };
}

export default async function Home() {
  const page = await getHomePage();
  const content = page ? splitContent(page.content.rendered) : { above: '', below: '' };

  return (
    <Layout>
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 min-h-[560px] flex items-center justify-center">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-[880px] px-4 sm:px-6 lg:px-8 text-center">
          {/* WordPress Content Above Search Bar */}
          {content.above && (
            <div
              className="prose prose-lg prose-invert max-w-none mb-6"
              style={{
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#ffffff',
                textShadow: '0 2px 8px rgba(0,0,0,0.45)',
              }}
              dangerouslySetInnerHTML={{ __html: content.above }}
            />
          )}

          {/* Search Bar */}
          <div className="max-w-[640px] mx-auto">
            <CitySearchBar placeholder="Saisir une ville pour trouver un stage" variant="large" />
          </div>
        </div>
      </div>

      {/* WordPress Content Below Search Bar */}
      {content.below && (
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div
              className="prose prose-lg prose-indigo max-w-none"
              dangerouslySetInnerHTML={{ __html: content.below }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
