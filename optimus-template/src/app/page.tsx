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

async function getHomePage(): Promise<WordPressPage | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin.digitalwebsuccess.com/wp-json/wp/v2';

    // Fetch the "Accueil" page from WordPress
    const response = await fetch(`${apiUrl}/pages?slug=accueil&status=publish`, {
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

export async function generateMetadata() {
  const page = await getHomePage();

  if (!page) {
    return {
      title: 'Optimus - Solutions d\'Intelligence Artificielle',
      description: 'Transformez votre entreprise avec nos solutions IA avancées.',
    };
  }

  return {
    title: `${page.title.rendered} | Optimus`,
    description: page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) || 'Solutions d\'Intelligence Artificielle',
  };
}

export default async function Home() {
  const page = await getHomePage();

  // Fallback if WordPress page not found (show default content)
  if (!page) {
    return (
      <Layout>
        <div className="bg-white">
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Solutions d'Intelligence Artificielle
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-200">
                  Transformez votre entreprise avec nos solutions IA avancées.
                </p>
                <p className="mt-4 text-sm text-yellow-200">
                  ⚠️ Page "Accueil" non trouvée dans WordPress
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Display WordPress content with search bar above
  return (
    <Layout>
      <article className="bg-white">
        {/* Hero Section with City Search */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Trouvez votre Stage de Récupération de Points
              </h1>
              <p className="text-lg text-gray-600">
                Récupérez 4 points en 48h - Stages agréés par la Préfecture
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <CitySearchBar placeholder="Entrez votre ville" variant="large" />
            </div>
          </div>
        </div>

        {/* WordPress Page Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg prose-indigo max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </div>
      </article>
    </Layout>
  );
}