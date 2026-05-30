import { NextRequest, NextResponse } from 'next/server';
import { logAnalyticsEvent } from '@/lib/db';

function getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

function getBrowser(userAgent: string): string {
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, type, page, referrer, utmSource, utmMedium, utmCampaign, metadata } = body;

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);

    await logAnalyticsEvent({
      sessionId,
      type,
      page,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      userAgent,
      deviceType,
      browser,
      metadata,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging analytics:', error);
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
  }
}