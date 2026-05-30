import { NextRequest, NextResponse } from 'next/server';
import { incrementAdImpression, incrementAdClick } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adId, action } = body;

    if (action === 'impression') {
      await incrementAdImpression(adId);
    } else if (action === 'click') {
      await incrementAdClick(adId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking ad event:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}