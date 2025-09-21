import { WordPressPost, WordPressPage } from '@/types/wordpress';

// For now, we'll use JSON files as mock WordPress data
// Later, this can be easily replaced with actual WordPress REST API calls

export async function getPosts(): Promise<WordPressPost[]> {
  try {
    // Return empty array since we're using Supabase now
    console.log('WordPress getPosts called - returning empty array (using Supabase instead)');
    return [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const posts = await getPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

export async function getPages(): Promise<WordPressPage[]> {
  try {
    // Return empty array since we're using Supabase now
    console.log('WordPress getPages called - returning empty array (using Supabase instead)');
    return [];
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const pages = await getPages();
    return pages.find(page => page.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}