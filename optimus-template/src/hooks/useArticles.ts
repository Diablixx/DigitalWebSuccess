'use client';

import { useState, useEffect } from 'react';

// WordPress API Response Type
interface WordPressPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  status: string;
  author: number;
  featured_media: number;
}

// Convert WordPress post to Article format
export interface Article {
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
}

function convertWordPressToArticle(post: WordPressPost): Article {
  return {
    id: post.id.toString(),
    title: post.title.rendered,
    content: post.content.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''), // Strip HTML
    read_time: '5 min', // Default read time
    published: post.status === 'publish',
    created_at: post.date,
    meta_description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
    author: 'Admin',
    category: 'Article'
  };
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📰 Loading published articles from WordPress...');

      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin.digitalwebsuccess.com/wp-json/wp/v2';

      const response = await fetch(`${apiUrl}/posts?status=publish&_embed`);

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const wordpressPosts: WordPressPost[] = await response.json();
      const convertedArticles = wordpressPosts.map(convertWordPressToArticle);

      console.log('✅ Articles loaded from WordPress:', convertedArticles.length);
      setArticles(convertedArticles);
    } catch (err) {
      console.error('❌ Error loading articles from WordPress:', err);
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();

    // Poll for updates every 30 seconds (since WordPress doesn't have real-time subscriptions)
    const interval = setInterval(loadArticles, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: loadArticles,
  };
}