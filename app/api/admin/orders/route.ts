import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, createOrder, getOrderById, updateOrder } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const orders = await getAllOrders(status);
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order = await createOrder({
      adId: body.adId,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientPhone: body.clientPhone,
      companyName: body.companyName,
      websiteUrl: body.websiteUrl,
      adTitle: body.adTitle,
      adDescription: body.adDescription,
      adImageUrl: body.adImageUrl,
      adTargetUrl: body.adTargetUrl,
      adPosition: body.adPosition,
      adSize: body.adSize,
      duration: body.duration,
      totalPrice: body.totalPrice,
      status: 'pending',
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}