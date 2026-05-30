import { NextResponse } from 'next/server';
import { getAnalyticsSummary, getAnalytics } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || undefined;

    if (sessionId) {
      const events = await getAnalytics({ sessionId });
      return NextResponse.json(events);
    }

    const summary = await getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}