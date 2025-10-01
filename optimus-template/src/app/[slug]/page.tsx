import Layout from '@/components/layout/Layout';
import { notFound } from 'next/navigation';

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

async function getPage(slug: string): Promise<WordPressPage | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin.digitalwebsuccess.com/wp-json/wp/v2';

    const response = await fetch(`${apiUrl}/pages?slug=${slug}&status=publish`, {
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
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: 'Page non trouvée | Optimus',
    };
  }

  return {
    title: `${page.title.rendered} | Optimus`,
    description: page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <Layout>
      <article className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              {page.title.rendered}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <time dateTime={page.modified}>
                Mis à jour le {new Date(page.modified).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </header>

          {/* Page Content */}
          <div
            className="prose prose-lg prose-indigo max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </div>
      </article>
    </Layout>
  );
}
