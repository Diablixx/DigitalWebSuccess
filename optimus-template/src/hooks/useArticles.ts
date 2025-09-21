'use client';

import { useState, useEffect } from 'react';
import { supabase, type Article } from '@/lib/supabase';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📰 Loading published articles from Supabase...');

      const { data, error: supabaseError } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('❌ Supabase error:', supabaseError);
        throw new Error(`Erreur Supabase: ${supabaseError.message}`);
      }

      console.log('✅ Articles loaded:', data?.length || 0);
      setArticles(data || []);
    } catch (err) {
      console.error('❌ Error loading articles:', err);
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadArticles();

    // Set up real-time subscription for article changes
    console.log('🔄 Setting up real-time subscription for articles...');

    const subscription = supabase
      .channel('articles_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'articles',
          filter: 'published=eq.true' // Only listen to published articles
        },
        (payload) => {
          console.log('🔔 Real-time article update:', payload);

          if (payload.eventType === 'INSERT' && payload.new) {
            // New article published
            setArticles(prev => [payload.new as Article, ...prev]);
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            // Article updated
            setArticles(prev =>
              prev.map(article =>
                article.id === payload.new.id ? payload.new as Article : article
              )
            );
          } else if (payload.eventType === 'DELETE' && payload.old) {
            // Article unpublished or deleted
            setArticles(prev =>
              prev.filter(article => article.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('🧹 Cleaning up articles subscription...');
      subscription.unsubscribe();
    };
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: loadArticles,
  };
}