import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    let where: any = {};
    if (date) {
      where.date = date;
    }

    if (!user || user.role !== 'ADMIN') {
      if (user) {
        where.userId = user.userId;
      }
    }

    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ reservations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const { name, phone, email, date, time, guests, tableNumber, specialRequest } = await req.json();

    if (!name || !phone || !email || !date || !time || !guests || !tableNumber) {
      return NextResponse.json(
        { error: 'Name, phone, email, date, time, guests, and table selection are required.' },
        { status: 400 }
      );
    }

    // Backend validation for double-booking prevention:
    const existingConflict = await prisma.reservation.findFirst({
      where: {
        tableNumber,
        date,
        time,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (existingConflict) {
      return NextResponse.json(
        { error: `Table ${tableNumber} is already reserved for ${time} on ${date}. Please select another table or time.` },
        { status: 409 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: user ? user.userId : null,
        name,
        phone,
        email,
        date,
        time,
        guests: parseInt(guests, 10),
        tableNumber,
        specialRequest: specialRequest || null,
        status: 'CONFIRMED',
      },
    });

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error: any) {
    console.error('Reservation Creation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
