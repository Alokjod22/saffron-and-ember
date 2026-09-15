import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      take: 12,
      orderBy: { createdAt: 'desc' },
      include: {
        menuItem: { select: { name: true, image: true } },
      },
    });
    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const { rating, comment, menuItemId } = await req.json();

    if (!rating || !comment) {
      return NextResponse.json({ error: 'Rating and comment are required' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userId: user ? user.userId : null,
        userName: user ? user.name : 'Food Enthusiast',
        menuItemId: menuItemId || null,
        rating: parseInt(rating, 10),
        comment,
      },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
