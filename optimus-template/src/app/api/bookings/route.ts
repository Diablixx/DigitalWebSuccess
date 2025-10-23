import { NextRequest, NextResponse } from 'next/server';

const MYSQL_API_URL = process.env.NEXT_PUBLIC_MYSQL_API_URL || 'http://admin.digitalwebsuccess.com/mysql-api';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();

    console.log('📨 Proxying booking request to MySQL API...');

    // Forward the request to the PHP API
    const response = await fetch(`${MYSQL_API_URL}/bookings.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.O2SWITCH_API_KEY || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log('✅ Booking API response:', response.status, data);

    // Return the response with the same status code
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Error proxying booking request:', error);
    return NextResponse.json(
      { error: 'Failed to process booking', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');

    if (!ref) {
      return NextResponse.json({ error: 'Missing booking reference' }, { status: 400 });
    }

    console.log('📨 Fetching booking:', ref);

    const response = await fetch(`${MYSQL_API_URL}/bookings.php?ref=${ref}`, {
      headers: {
        'X-API-Key': process.env.O2SWITCH_API_KEY || '',
      },
    });
    const data = await response.json();

    console.log('✅ Booking fetch response:', response.status);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
