import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';

async function getArticle(slug: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Configuration Supabase manquante');
      return null;
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/articles?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error('Erreur lors du chargement de l\'article:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Erreur lors du chargement de l\'article:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Article non trouvé | Optimus',
      description: 'Cet article n\'existe pas ou n\'est plus disponible.',
    };
  }

  return {
    title: `${article.title} | Optimus`,
    description: article.meta_description || article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.meta_description || article.excerpt || article.title,
      type: 'article',
      publishedTime: article.created_at,
      authors: [article.author || 'Optimus'],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // Convert content from markdown-style to HTML
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Convert markdown headers to HTML
        if (line.startsWith('## ')) {
          return `<h2 key="${index}" class="text-2xl font-bold text-gray-900 mt-8 mb-4">${line.slice(3)}</h2>`;
        }
        if (line.startsWith('# ')) {
          return `<h1 key="${index}" class="text-3xl font-bold text-gray-900 mt-8 mb-6">${line.slice(2)}</h1>`;
        }
        // Convert paragraphs
        if (line.trim() && !line.startsWith('#')) {
          return `<p key="${index}" class="text-gray-700 mb-4 leading-relaxed">${line}</p>`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  };

  return (
    <Layout>
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span>📅 {new Date(article.created_at).toLocaleDateString('fr-FR')}</span>
              <span>🕒 {article.read_time}</span>
              <span>👤 {article.author}</span>
              {article.keyword && <span>🏷️ {article.keyword}</span>}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {article.excerpt.replace(/^##?\s*Introduction\s*\n*/, '')}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Catégorie: {article.category}</span>
                {article.keyword && <span>Mot-clé: {article.keyword}</span>}
              </div>
              <div className="text-sm text-gray-500">
                Publié le {new Date(article.created_at).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </footer>
        </div>
      </article>
    </Layout>
  );
}