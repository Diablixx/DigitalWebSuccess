import { NextRequest, NextResponse } from 'next/server';

// WordPress API proxy route - fixes CORS and mixed content issues
export async function GET(request: NextRequest) {
  try {
    const wordpressApiUrl = 'https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts?status=publish&_embed';

    console.log('🔄 Proxying WordPress API request:', wordpressApiUrl);

    const response = await fetch(wordpressApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Allow self-signed SSL certificates
      // @ts-ignore
      rejectUnauthorized: false,
    });

    if (!response.ok) {
      console.error('❌ WordPress API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: `WordPress API error: ${response.status}` },
        { status: response.status }
      );
    }

    const posts = await response.json();
    console.log('✅ WordPress API success:', posts.length, 'posts retrieved');

    // Add CORS headers for frontend access
    return NextResponse.json(posts, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('❌ API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles from WordPress' },
      { status: 500 }
    );
  }
}