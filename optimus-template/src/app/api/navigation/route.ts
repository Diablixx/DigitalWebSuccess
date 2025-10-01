import { NextResponse } from 'next/server';

// WordPress Page API Response Type
interface WordPressPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  parent: number;
  menu_order: number;
  status: string;
  date: string;
  modified: string;
}

// Navigation Item Type
export interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  href: string;
  children: NavigationChild[];
  hasChildren: boolean;
}

export interface NavigationChild {
  id: string;
  title: string;
  slug: string;
  href: string;
}

// Build navigation hierarchy from WordPress pages
function buildNavigationHierarchy(pages: WordPressPage[]): NavigationItem[] {
  // Sort pages by menu_order for consistent ordering
  const sortedPages = [...pages].sort((a, b) => a.menu_order - b.menu_order);

  // Separate parent pages (parent = 0) from child pages
  const parentPages = sortedPages.filter(page => page.parent === 0);
  const childPages = sortedPages.filter(page => page.parent !== 0);

  // Build navigation structure
  const navigation: NavigationItem[] = parentPages.map(parent => {
    // Find all children for this parent
    const children = childPages
      .filter(child => child.parent === parent.id)
      .map(child => ({
        id: child.id.toString(),
        title: child.title.rendered,
        slug: child.slug,
        href: `/${child.slug}`,
      }));

    return {
      id: parent.id.toString(),
      title: parent.title.rendered,
      slug: parent.slug,
      href: parent.slug === 'accueil' ? '/' : `/${parent.slug}`,
      children,
      hasChildren: children.length > 0,
    };
  });

  return navigation;
}

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin.digitalwebsuccess.com/wp-json/wp/v2';

    console.log('📡 Fetching WordPress pages for navigation...');

    // Fetch all published pages (WordPress API returns 10 by default, so we use per_page=100)
    const response = await fetch(`${apiUrl}/pages?status=publish&per_page=100&orderby=menu_order&order=asc`, {
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const pages: WordPressPage[] = await response.json();

    console.log(`✅ Fetched ${pages.length} pages from WordPress`);

    // Build navigation hierarchy
    const navigation = buildNavigationHierarchy(pages);

    console.log(`✅ Built navigation with ${navigation.length} parent items`);

    return NextResponse.json({
      success: true,
      navigation,
      totalPages: pages.length,
    });

  } catch (error) {
    console.error('❌ Error fetching navigation:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch navigation',
        navigation: [],
      },
      { status: 500 }
    );
  }
}
