import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ city: string }> }
) {
  try {
    const { city } = await params;
    const apiUrl = 'http://admin.digitalwebsuccess.com/wp-json/wp/v2';

    console.log(`🔍 Server fetching WordPress content for: ${city}`);

    const response = await fetch(`${apiUrl}/pages?slug=stages-${city}&status=publish`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return NextResponse.json({ content: null }, { status: 404 });
    }

    const pages = await response.json();

    if (pages.length === 0) {
      return NextResponse.json({ content: null }, { status: 404 });
    }

    console.log(`✅ Found WordPress content for: ${city}`);

    return NextResponse.json({
      content: pages[0].content.rendered,
      title: pages[0].title.rendered,
    });
  } catch (error) {
    console.error('Error fetching city content:', error);
    return NextResponse.json({ content: null }, { status: 500 });
  }
}
