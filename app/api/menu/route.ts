import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const vegetarian = searchParams.get('vegetarian');
    const vegan = searchParams.get('vegan');
    const spicy = searchParams.get('spicy');
    const popular = searchParams.get('popular');
    const featured = searchParams.get('featured');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const where: any = {};

    if (category && category !== 'all') {
      where.category = { slug: category };
    }

    if (vegetarian === 'true') {
      where.vegetarian = true;
    }

    if (vegan === 'true') {
      where.vegan = true;
    }

    if (spicy) {
      where.spicyLevel = parseInt(spicy, 10);
    }

    if (popular === 'true') {
      where.popular = true;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
      ];
    }

    const items = await prisma.menuItem.findMany({
      where,
      include: {
        category: true,
        reviews: {
          select: { rating: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const itemsWithRating = items.map((item) => {
      const totalRatings = item.reviews.reduce((acc, r) => acc + r.rating, 0);
      const avgRating = item.reviews.length > 0 ? (totalRatings / item.reviews.length).toFixed(1) : '4.8';
      return {
        ...item,
        avgRating: parseFloat(avgRating as string),
        reviewsCount: item.reviews.length || 12,
      };
    });

    return NextResponse.json({ items: itemsWithRating });
  } catch (error: any) {
    console.error('Menu GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const {
      categoryId,
      name,
      description,
      price,
      image,
      vegetarian,
      vegan,
      spicyLevel,
      preparationTime,
      calories,
      popular,
      available,
      featured,
    } = body;

    if (!categoryId || !name || !description || !price || !image) {
      return NextResponse.json(
        { error: 'Category, name, description, price, and image are required' },
        { status: 400 }
      );
    }

    const slug = slugify(name) + '-' + Date.now();

    const newItem = await prisma.menuItem.create({
      data: {
        categoryId,
        name,
        slug,
        description,
        price: parseFloat(price),
        image,
        vegetarian: Boolean(vegetarian),
        vegan: Boolean(vegan),
        spicyLevel: parseInt(spicyLevel || '0', 10),
        preparationTime: preparationTime || '20 mins',
        calories: parseInt(calories || '400', 10),
        popular: Boolean(popular),
        available: available !== undefined ? Boolean(available) : true,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('Menu POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
