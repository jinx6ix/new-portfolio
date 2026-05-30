import { NextRequest, NextResponse } from 'next/server';
import { getAllAds, createAd, getAdById, updateAd, deleteAd } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const ads = await getAllAds(status);
    return NextResponse.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ad = await createAd({
      title: body.title,
      description: body.description,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientPhone: body.clientPhone,
      websiteUrl: body.websiteUrl,
      imageUrl: body.imageUrl,
      targetUrl: body.targetUrl,
      position: body.position,
      size: body.size,
      status: body.status || 'pending',
      startDate: body.startDate,
      endDate: body.endDate,
    });
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
  }
}