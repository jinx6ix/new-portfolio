import { NextResponse } from 'next/server';
import { getActiveAds, incrementAdImpression } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position') || undefined;
    const ads = await getActiveAds(position);
    return NextResponse.json(ads);
  } catch (error) {
    console.error('Error fetching active ads:', error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}