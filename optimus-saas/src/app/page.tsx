'use client';

import { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  read_time: string;
  published: boolean;
  created_at: string;
  meta_description: string;
  author: string;
  category: string;
  keyword?: string;
}

export default function Dashboard() {
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);

  // Generate article from keyword
  const handleGenerate = async () => {
    if (!keyword.trim()) {
      setMessage('Veuillez saisir un mot-clé pour générer l\'article.');
      return;
    }

    setIsGenerating(true);
    setMessage('Génération en cours...');

    try {
      // Call N8N generation webhook
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      console.log('🔍 DEBUG: Webhook URL from env:', webhookUrl);
      if (!webhookUrl) {
        throw new Error('URL webhook N8N non configurée');
      }

      console.log('🚀 DEBUG: Making fetch request to:', webhookUrl);
      console.log('📦 DEBUG: Request payload:', { keyword: keyword.trim() });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });

      console.log('✅ DEBUG: Response status:', response.status);

      if (!response.ok) {
        throw new Error('Erreur lors de la génération');
      }

      setMessage('Article généré ! Récupération en cours...');

      // Wait 15 seconds for N8N to process and save to Supabase
      setTimeout(async () => {
        try {
          // Search for the article by keyword
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
          const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

          const searchResponse = await fetch(
            `${supabaseUrl}/rest/v1/articles?keyword=eq.${encodeURIComponent(keyword.trim())}&select=*`,
            {
              headers: {
                'apikey': supabaseKey!,
                'Authorization': `Bearer ${supabaseKey!}`,
              },
            }
          );

          const searchData = await searchResponse.json();

          if (searchData && searchData.length > 0) {
            const article = searchData[0];
            setTitle(article.title || '');
            setContent(article.content || '');
            setMessage('Article récupéré avec succès ! Vous pouvez maintenant le modifier et le publier.');
          } else {
            setMessage('Article généré mais non trouvé dans la base. Veuillez réessayer.');
          }
        } catch (error) {
          setMessage('Erreur lors de la récupération de l\'article.');
          console.error('Search error:', error);
        }
      }, 15000);

    } catch (error) {
      setMessage('Erreur lors de la génération de l\'article.');
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Publish article
  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage('Veuillez remplir le titre et le contenu avant de publier.');
      return;
    }

    setIsPublishing(true);
    setMessage('Publication en cours...');

    try {
      const publishWebhookUrl = process.env.NEXT_PUBLIC_N8N_PUBLISH_WEBHOOK_URL;
      if (!publishWebhookUrl) {
        throw new Error('URL webhook de publication non configurée');
      }

      const response = await fetch(publishWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          keyword: keyword.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la publication');
      }

      setMessage('Article publié avec succès !');

      // Clear form
      setKeyword('');
      setTitle('');
      setContent('');

      // Refresh articles list
      loadArticles();

    } catch (error) {
      setMessage('Erreur lors de la publication de l\'article.');
      console.error('Publish error:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  // Load articles from Supabase
  const loadArticles = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/articles?select=*&order=created_at.desc&limit=10`,
        {
          headers: {
            'apikey': supabaseKey!,
            'Authorization': `Bearer ${supabaseKey!}`,
          },
        }
      );

      const data = await response.json();
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Optimus SAAS
          </h1>
          <p className="text-gray-600">
            Générez et publiez des articles avec l'intelligence artificielle
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generation Panel */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Génération d'Article IA
            </h2>

            {/* Keyword Input */}
            <div className="mb-6">
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                Mot-clé
              </label>
              <input
                type="text"
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Saisissez un mot-clé unique"
                disabled={isGenerating}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !keyword.trim()}
              className="w-full mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? '⏳ Génération...' : '✨ Générer l\'article'}
            </button>

            {/* Title Editor */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Titre de l'article"
              />
            </div>

            {/* Content Editor */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contenu de l'article"
              />
            </div>

            {/* Publish Button */}
            <button
              onClick={handlePublish}
              disabled={isPublishing || !title.trim() || !content.trim()}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isPublishing ? '📤 Publication...' : '🚀 Publier l\'article'}
            </button>

            {/* Message */}
            {message && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800 text-sm">{message}</p>
              </div>
            )}
          </div>

          {/* Articles List */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Articles Récents
            </h2>

            <div className="space-y-4">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <div key={article.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {article.excerpt || 'Pas d\'extrait disponible'}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>📅 {new Date(article.created_at).toLocaleDateString('fr-FR')}</span>
                          <span>🏷️ {article.keyword || 'Pas de mot-clé'}</span>
                          <span className={article.published ? 'text-green-600' : 'text-orange-600'}>
                            {article.published ? '✅ Publié' : '⏳ Brouillon'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun article trouvé</p>
                  <p className="text-sm mt-2">Générez votre premier article avec un mot-clé !</p>
                </div>
              )}
            </div>

            <button
              onClick={loadArticles}
              className="w-full mt-6 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              🔄 Actualiser la liste
            </button>
          </div>
        </div>

        {/* Configuration Info */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            📋 Configuration Requise
          </h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>• URL Webhook N8N: {process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ? '✅ Configuré' : '❌ Manquant'}</p>
            <p>• URL Webhook Publication: {process.env.NEXT_PUBLIC_N8N_PUBLISH_WEBHOOK_URL ? '✅ Configuré' : '❌ Manquant'}</p>
            <p>• Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configuré' : '❌ Manquant'}</p>
            <p>• Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configuré' : '❌ Manquant'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}