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

    // Get a default valid MenuItem ID in case of custom plates
    const fallbackItem = await prisma.menuItem.findFirst();
    const fallbackId = fallbackItem?.id;

    const formattedOrderItems = [];
    for (const item of items) {
      let targetMenuItemId = item.menuItemId;

      if (!targetMenuItemId || targetMenuItemId.startsWith('custom-plate') || targetMenuItemId.startsWith('plate-')) {
        targetMenuItemId = fallbackId;
      } else {
        const itemExists = await prisma.menuItem.findUnique({ where: { id: targetMenuItemId } });
        if (!itemExists) {
          targetMenuItemId = fallbackId;
        }
      }

      if (targetMenuItemId) {
        formattedOrderItems.push({
          menuItemId: targetMenuItemId,
          quantity: item.quantity || 1,
          price: parseFloat(item.price || 0),
          customizations: item.customizations
            ? typeof item.customizations === 'string'
              ? item.customizations
              : JSON.stringify(item.customizations)
            : (item.name ? JSON.stringify({ customName: item.name }) : null),
        });
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: user ? user.userId : null,
        orderType: orderType || 'DELIVERY',
        subtotal: parseFloat(subtotal || 0),
        tax: parseFloat(tax || 0),
        discount: parseFloat(discount || 0),
        total: parseFloat(total || 0),
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        deliveryAddress: deliveryAddress || null,
        customerName: customerName || (user ? user.name : 'Customer'),
        customerEmail: customerEmail || (user ? user.email : null),
        customerPhone: customerPhone || null,
        status: 'PENDING',
        orderItems: {
          create: formattedOrderItems,
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
