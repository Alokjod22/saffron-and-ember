import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let where: any = {};

    if (!user || user.role !== 'ADMIN') {
      // If customer, show only customer's orders
      if (!user) {
        return NextResponse.json({ orders: [] });
      }
      where.userId = user.userId;
    } else if (status && status !== 'ALL') {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: { menuItem: true },
        },
        user: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const body = await req.json();
    const {
      items,
      orderType,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      deliveryAddress,
      customerName,
      customerEmail,
      customerPhone,
    } = body;

    if (!items || !items.length) {
      return NextResponse.json({ error: 'Order items are required' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId: user ? user.userId : null,
        orderType: orderType || 'DELIVERY',
        subtotal: parseFloat(subtotal),
        tax: parseFloat(tax),
        discount: parseFloat(discount || 0),
        total: parseFloat(total),
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        deliveryAddress: deliveryAddress || null,
        customerName: customerName || (user ? user.name : 'Guest'),
        customerEmail: customerEmail || (user ? user.email : null),
        customerPhone: customerPhone || null,
        status: 'CONFIRMED',
        orderItems: {
          create: items.map((item: any) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: parseFloat(item.price),
            customizations: item.customizations ? JSON.stringify(item.customizations) : null,
          })),
        },
      },
      include: {
        orderItems: {
          include: { menuItem: true },
        },
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
