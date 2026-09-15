import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized access to Admin API' }, { status: 403 });
    }

    const totalOrders = await prisma.order.count();
    const totalCustomers = await prisma.user.count({ where: { role: 'CUSTOMER' } });
    const activeReservations = await prisma.reservation.count({
      where: { status: { in: ['PENDING', 'CONFIRMED'] } },
    });

    const allOrders = await prisma.order.findMany({
      select: { total: true, createdAt: true, status: true },
    });

    const totalRevenue = allOrders.reduce((acc, curr) => acc + curr.total, 0);

    const todayStr = new Date().toISOString().split('T')[0];
    const todayOrders = allOrders.filter(
      (o) => o.createdAt.toISOString().split('T')[0] === todayStr
    );
    const todayRevenue = todayOrders.reduce((acc, curr) => acc + curr.total, 0);

    // Recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: { include: { menuItem: true } },
      },
    });

    // Popular dishes count
    const topDishes = await prisma.menuItem.findMany({
      where: { popular: true },
      take: 5,
      select: { id: true, name: true, price: true, image: true, category: { select: { name: true } } },
    });

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue,
        todayRevenue,
        activeReservations,
        totalCustomers,
      },
      recentOrders,
      topDishes,
    });
  } catch (error: any) {
    console.error('Admin Dashboard Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
