import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Saffron & Ember database...');

  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const customerPassword = await bcrypt.hash('Customer123!', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Chef Vikram Sharma (Admin)',
      email: 'admin@saffronandember.com',
      passwordHash: adminPassword,
      phone: '+91 90000 12345',
      role: 'ADMIN',
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      name: 'Ananya Malhotra',
      email: 'customer@example.com',
      passwordHash: customerPassword,
      phone: '+91 98765 43210',
      role: 'CUSTOMER',
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      name: 'Rahul Kapoor',
      email: 'rahul.k@example.com',
      passwordHash: customerPassword,
      phone: '+91 98111 22334',
      role: 'CUSTOMER',
    },
  });

  const customer3 = await prisma.user.create({
    data: {
      name: 'Priya Sundaram',
      email: 'priya.s@example.com',
      passwordHash: customerPassword,
      phone: '+91 97222 33445',
      role: 'CUSTOMER',
    },
  });

  const customer4 = await prisma.user.create({
    data: {
      name: 'Aarav Mehta',
      email: 'aarav.m@example.com',
      passwordHash: customerPassword,
      phone: '+91 96333 44556',
      role: 'CUSTOMER',
    },
  });

  // Create Categories
  const startersCat = await prisma.category.create({
    data: {
      name: 'Starters',
      slug: 'starters',
      description: 'Fiery tandoori delights and crispy traditional small plates.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
    },
  });

  const mainsCat = await prisma.category.create({
    data: {
      name: 'Indian Mains',
      slug: 'mains',
      description: 'Rich slow-cooked gravies and wood-fired tandoor specials.',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop',
    },
  });

  const biryaniCat = await prisma.category.create({
    data: {
      name: 'Biryani',
      slug: 'biryani',
      description: 'Aromatic basmati rice dum cooked with exotic saffron & whole spices.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    },
  });

  const breadsCat = await prisma.category.create({
    data: {
      name: 'Breads',
      slug: 'breads',
      description: 'Fresh clay oven tandoori naans, parathas, and rotis.',
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
    },
  });

  const streetCat = await prisma.category.create({
    data: {
      name: 'Street Food',
      slug: 'street-food',
      description: 'Iconic street flavours elevated with modern culinary flair.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    },
  });

  const dessertsCat = await prisma.category.create({
    data: {
      name: 'Desserts',
      slug: 'desserts',
      description: 'Indulgent sweet creations inspired by timeless Indian recipes.',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
    },
  });

  const drinksCat = await prisma.category.create({
    data: {
      name: 'Drinks',
      slug: 'drinks',
      description: 'Refreshing lassis, spiced coolers, and signature beverages.',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop',
    },
  });

  // Seed Menu Items
  const items = [
    // Starters
    {
      categoryId: startersCat.id,
      name: 'Saffron Paneer Tikka',
      slug: 'saffron-paneer-tikka',
      description: 'Soft cottage cheese marinated in Kashmiri saffron, hung curd, and stone-ground spices, charred in the tandoor.',
      price: 329,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 1,
      preparationTime: '15 mins',
      calories: 380,
      popular: true,
      featured: true,
    },
    {
      categoryId: startersCat.id,
      name: 'Tandoori Chicken Wings',
      slug: 'tandoori-chicken-wings',
      description: 'Succulent chicken wings tossed in smoked chilli marinade and flame-roasted to perfection.',
      price: 389,
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop',
      vegetarian: false,
      vegan: false,
      spicyLevel: 2,
      preparationTime: '20 mins',
      calories: 480,
      popular: true,
      featured: true,
    },
    {
      categoryId: startersCat.id,
      name: 'Malai Broccoli',
      slug: 'malai-broccoli',
      description: 'Tender broccoli florets infused with cardamom cream, cheese, and mild white pepper marinade.',
      price: 299,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '15 mins',
      calories: 290,
      popular: false,
      featured: false,
    },
    {
      categoryId: startersCat.id,
      name: 'Amritsari Fish Bites',
      slug: 'amritsari-fish-bites',
      description: 'Crispy carom-seed scented sole fish fritters served with tangy mint and raw mango chutney.',
      price: 429,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop',
      vegetarian: false,
      vegan: false,
      spicyLevel: 2,
      preparationTime: '18 mins',
      calories: 410,
      popular: false,
      featured: false,
    },
    {
      categoryId: startersCat.id,
      name: 'Crispy Lotus Stem',
      slug: 'crispy-lotus-stem',
      description: 'Thinly sliced lotus root tossed with Kashmiri red chilli glaze, sesame, and scallions.',
      price: 319,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: true,
      spicyLevel: 1,
      preparationTime: '12 mins',
      calories: 260,
      popular: false,
      featured: false,
    },

    // Indian Mains
    {
      categoryId: mainsCat.id,
      name: 'Butter Chicken',
      slug: 'butter-chicken',
      description: 'Tandoori charred chicken simmered in rich velvety tomato, fenugreek, and artisanal butter gravy.',
      price: 449,
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop',
      vegetarian: false,
      vegan: false,
      spicyLevel: 1,
      preparationTime: '25 mins',
      calories: 580,
      popular: true,
      featured: true,
    },
    {
      categoryId: mainsCat.id,
      name: 'Paneer Lababdar',
      slug: 'paneer-lababdar',
      description: 'Soft cottage cheese cubes cooked in a luscious onion-tomato reduction with grated paneer and cashews.',
      price: 399,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 1,
      preparationTime: '20 mins',
      calories: 490,
      popular: true,
      featured: true,
    },
    {
      categoryId: mainsCat.id,
      name: 'Dal Makhani',
      slug: 'dal-makhani',
      description: 'Whole black lentils slow-cooked overnight over charcoal embers, finished with cream and white butter.',
      price: 329,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '20 mins',
      calories: 420,
      popular: true,
      featured: false,
    },
    {
      categoryId: mainsCat.id,
      name: 'Mutton Rogan Josh',
      slug: 'mutton-rogan-josh',
      description: 'Tender tenderloin mutton braised in Kashmiri chilli, dry ginger, and aromatic fennel spice extract.',
      price: 499,
      image: 'https://images.unsplash.com/photo-1545247181-516773cae754?q=80&w=800&auto=format&fit=crop',
      vegetarian: false,
      vegan: false,
      spicyLevel: 2,
      preparationTime: '30 mins',
      calories: 620,
      popular: false,
      featured: true,
    },
    {
      categoryId: mainsCat.id,
      name: 'Vegetable Korma',
      slug: 'vegetable-korma',
      description: 'Garden fresh vegetables gently simmered in a coconut and cashew nut mild gravy.',
      price: 359,
      image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: true,
      spicyLevel: 0,
      preparationTime: '20 mins',
      calories: 340,
      popular: false,
      featured: false,
    },
    {
      categoryId: mainsCat.id,
      name: 'Chicken Chettinad',
      slug: 'chicken-chettinad',
      description: 'Spicy South Indian chicken curry made with roasted star anise, black pepper, and curry leaves.',
      price: 469,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
      vegetarian: false,
      vegan: false,
      spicyLevel: 3,
      preparationTime: '25 mins',
      calories: 540,
      popular: false,
      featured: false,
    },

    // Biryani
    {
      categoryId: biryaniCat.id,
      name: 'Saffron Chicken Biryani',
      slug: 'saffron-chicken-biryani',
      description: 'Layered aged basmati rice dum cooked with marinated chicken, saffron strands, caramelized onions, and kewra water.',
      price: 429,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
      vegetarian: false,
      vegan: false,
      spicyLevel: 2,
      preparationTime: '25 mins',
      calories: 650,
      popular: true,
      featured: true,
    },
    {
      categoryId: biryaniCat.id,
      name: 'Hyderabadi Mutton Biryani',
      slug: 'hyderabadi-mutton-biryani',
      description: 'Authentic raw-marinated mutton cooked under seal dum with long-grain rice, mint, and whole spices.',
      price: 499,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop',
      vegetarian: false,
      vegan: false,
      spicyLevel: 3,
      preparationTime: '30 mins',
      calories: 720,
      popular: true,
      featured: false,
    },
    {
      categoryId: biryaniCat.id,
      name: 'Royal Vegetable Biryani',
      slug: 'royal-vegetable-biryani',
      description: 'Seasonal vegetables and roasted nuts slow-infused with saffron basmati rice and rose water.',
      price: 349,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 1,
      preparationTime: '20 mins',
      calories: 480,
      popular: false,
      featured: false,
    },
    {
      categoryId: biryaniCat.id,
      name: 'Paneer Tikka Biryani',
      slug: 'paneer-tikka-biryani',
      description: 'Charcoal grilled spicy paneer cubes layered with aromatic spiced rice and roasted onions.',
      price: 379,
      image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 2,
      preparationTime: '22 mins',
      calories: 530,
      popular: false,
      featured: false,
    },

    // Breads
    {
      categoryId: breadsCat.id,
      name: 'Garlic Naan',
      slug: 'garlic-naan',
      description: 'Leavened clay oven flatbread infused with minced fresh garlic, coriander, and molten butter.',
      price: 109,
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '10 mins',
      calories: 220,
      popular: true,
      featured: false,
    },
    {
      categoryId: breadsCat.id,
      name: 'Butter Naan',
      slug: 'butter-naan',
      description: 'Soft and pillowy naan baked in a hot tandoor and brushed generously with desi ghee.',
      price: 89,
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '10 mins',
      calories: 200,
      popular: false,
      featured: false,
    },
    {
      categoryId: breadsCat.id,
      name: 'Cheese Chilli Naan',
      slug: 'cheese-chilli-naan',
      description: 'Artisanal naan stuffed with gooey mozzarella, green chillies, and chat masala.',
      price: 149,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 1,
      preparationTime: '12 mins',
      calories: 280,
      popular: true,
      featured: false,
    },
    {
      categoryId: breadsCat.id,
      name: 'Tandoori Roti',
      slug: 'tandoori-roti',
      description: 'Whole wheat flatbread baked against the hot inner wall of the clay oven.',
      price: 59,
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: true,
      spicyLevel: 0,
      preparationTime: '8 mins',
      calories: 130,
      popular: false,
      featured: false,
    },
    {
      categoryId: breadsCat.id,
      name: 'Laccha Paratha',
      slug: 'laccha-paratha',
      description: 'Multi-layered crispy whole wheat bread dusted with crushed carom seeds and butter.',
      price: 99,
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '10 mins',
      calories: 210,
      popular: false,
      featured: false,
    },

    // Street Food
    {
      categoryId: streetCat.id,
      name: 'Mumbai Masala Pav',
      slug: 'mumbai-masala-pav',
      description: 'Soft buttered bun toasted in spicy tomato-onion bhaji reduction with fresh cilantro.',
      price: 179,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 2,
      preparationTime: '12 mins',
      calories: 320,
      popular: false,
      featured: false,
    },
    {
      categoryId: streetCat.id,
      name: 'Delhi Butter Chicken Roll',
      slug: 'delhi-butter-chicken-roll',
      description: 'Flaky rumali flatbread wrapped around smoky butter chicken, sliced onions, and mint chutney.',
      price: 249,
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop',
      vegetarian: false,
      vegan: false,
      spicyLevel: 1,
      preparationTime: '15 mins',
      calories: 460,
      popular: true,
      featured: false,
    },
    {
      categoryId: streetCat.id,
      name: 'Paneer Kathi Roll',
      slug: 'paneer-kathi-roll',
      description: 'Layered paratha stuffed with spiced paneer tikka, bell peppers, mint aioli, and pickled onions.',
      price: 229,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 1,
      preparationTime: '14 mins',
      calories: 390,
      popular: false,
      featured: false,
    },
    {
      categoryId: streetCat.id,
      name: 'Dilli Aloo Tikki',
      slug: 'dilli-aloo-tikki',
      description: 'Crispy spiced potato patties topped with sweetened yogurt, tamarind chutney, and pomegranate seeds.',
      price: 169,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: true,
      spicyLevel: 1,
      preparationTime: '10 mins',
      calories: 290,
      popular: false,
      featured: false,
    },

    // Desserts
    {
      categoryId: dessertsCat.id,
      name: 'Saffron Gulab Jamun',
      slug: 'saffron-gulab-jamun',
      description: 'Warm fried milk solids steeped in saffron, pistachio, and green cardamom sugar syrup.',
      price: 179,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '8 mins',
      calories: 310,
      popular: true,
      featured: false,
    },
    {
      categoryId: dessertsCat.id,
      name: 'Rasmalai Tres Leches',
      slug: 'rasmalai-tres-leches',
      description: 'Fusion creation: soft sponge soaked in saffron-cardamom milk topped with chenna rasmalai patties.',
      price: 249,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '10 mins',
      calories: 380,
      popular: false,
      featured: true,
    },
    {
      categoryId: dessertsCat.id,
      name: 'Chocolate Kulfi',
      slug: 'chocolate-kulfi',
      description: 'Traditional slow-boiled milk ice cream laced with dark Belgian chocolate and roasted almonds.',
      price: 199,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '5 mins',
      calories: 290,
      popular: false,
      featured: false,
    },
    {
      categoryId: dessertsCat.id,
      name: 'Mango Shrikhand',
      slug: 'mango-shrikhand',
      description: 'Creamy hung curd whipped with Alphonso mango pulp, saffron strands, and chironji seeds.',
      price: 189,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '5 mins',
      calories: 270,
      popular: false,
      featured: false,
    },

    // Drinks
    {
      categoryId: drinksCat.id,
      name: 'Masala Chaas',
      slug: 'masala-chaas',
      description: 'Chilled spiced buttermilk tempered with roasted cumin, rock salt, sculp cilantro, and green chillies.',
      price: 99,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 1,
      preparationTime: '5 mins',
      calories: 80,
      popular: false,
      featured: false,
    },
    {
      categoryId: drinksCat.id,
      name: 'Saffron Lassi',
      slug: 'saffron-lassi',
      description: 'Thick churned sweet yogurt elixir infused with pure Kashmiri saffron and topped with slivered pistachios.',
      price: 149,
      image: 'https://images.unsplash.com/photo-1571006682860-032034e341dd?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '5 mins',
      calories: 240,
      popular: true,
      featured: true,
    },
    {
      categoryId: drinksCat.id,
      name: 'Mango Lassi',
      slug: 'mango-lassi',
      description: 'Rich blend of ripe Alphonso mangoes, thick yogurt, and a touch of fragrant green cardamom.',
      price: 139,
      image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '5 mins',
      calories: 220,
      popular: true,
      featured: false,
    },
    {
      categoryId: drinksCat.id,
      name: 'Fresh Lime Soda',
      slug: 'fresh-lime-soda',
      description: 'Sparkling mineral water muddled with fresh key lime juice, black salt, and mint leaves.',
      price: 119,
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: true,
      spicyLevel: 0,
      preparationTime: '5 mins',
      calories: 60,
      popular: false,
      featured: false,
    },
    {
      categoryId: drinksCat.id,
      name: 'Rose Mint Cooler',
      slug: 'rose-mint-cooler',
      description: 'Organic rose petal preserve infused with fresh spearmint, lemon juice, and crushed ice.',
      price: 159,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: true,
      spicyLevel: 0,
      preparationTime: '5 mins',
      calories: 90,
      popular: false,
      featured: false,
    },
    {
      categoryId: drinksCat.id,
      name: 'Classic Cold Coffee',
      slug: 'classic-cold-coffee',
      description: 'Hand-crafted espresso blended with chilled milk, vanilla bean ice cream, and cocoa powder.',
      price: 179,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
      vegetarian: true,
      vegan: false,
      spicyLevel: 0,
      preparationTime: '6 mins',
      calories: 210,
      popular: false,
      featured: false,
    },
  ];

  const createdMenuItems: Record<string, any> = {};
  for (const item of items) {
    const created = await prisma.menuItem.create({ data: item });
    createdMenuItems[item.slug] = created;
  }

  // Create Reservations (T1 to T8)
  const today = new Date().toISOString().split('T')[0];
  const reservations = [
    {
      userId: customer1.id,
      name: customer1.name,
      phone: customer1.phone!,
      email: customer1.email,
      date: today,
      time: '19:00',
      guests: 2,
      tableNumber: 'T1',
      status: 'CONFIRMED',
      specialRequest: 'Corner window table if available.',
    },
    {
      userId: customer2.id,
      name: customer2.name,
      phone: customer2.phone!,
      email: customer2.email,
      date: today,
      time: '19:30',
      guests: 4,
      tableNumber: 'T2',
      status: 'CONFIRMED',
      specialRequest: 'Celebrating anniversary.',
    },
    {
      userId: customer3.id,
      name: customer3.name,
      phone: customer3.phone!,
      email: customer3.email,
      date: today,
      time: '20:00',
      guests: 3,
      tableNumber: 'T4',
      status: 'PENDING',
      specialRequest: 'High chair for toddler.',
    },
    {
      userId: customer4.id,
      name: customer4.name,
      phone: customer4.phone!,
      email: customer4.email,
      date: today,
      time: '20:30',
      guests: 6,
      tableNumber: 'T7',
      status: 'CONFIRMED',
      specialRequest: 'Quiet section.',
    },
  ];

  for (const r of reservations) {
    await prisma.reservation.create({ data: r });
  }

  // Create Sample Orders
  const butterChicken = createdMenuItems['butter-chicken'];
  const saffronPaneer = createdMenuItems['saffron-paneer-tikka'];
  const garlicNaan = createdMenuItems['garlic-naan'];
  const saffronBiryani = createdMenuItems['saffron-chicken-biryani'];
  const gulabJamun = createdMenuItems['saffron-gulab-jamun'];

  const ordersData = [
    {
      userId: customer1.id,
      status: 'COMPLETED',
      orderType: 'DELIVERY',
      subtotal: 887,
      tax: 44.35,
      discount: 88.7,
      total: 842.65,
      paymentStatus: 'PAID',
      deliveryAddress: 'Flat 402, Sea Green Apartments, Worli, Mumbai 400018',
      customerName: customer1.name,
      customerEmail: customer1.email,
      customerPhone: customer1.phone,
      items: [
        { menuItemId: butterChicken.id, quantity: 1, price: 449 },
        { menuItemId: garlicNaan.id, quantity: 2, price: 109 },
        { menuItemId: gulabJamun.id, quantity: 1, price: 179 },
      ],
    },
    {
      userId: customer2.id,
      status: 'PREPARING',
      orderType: 'DINE_IN',
      subtotal: 1157,
      tax: 57.85,
      discount: 0,
      total: 1214.85,
      paymentStatus: 'PAID',
      deliveryAddress: 'Table T2',
      customerName: customer2.name,
      customerEmail: customer2.email,
      customerPhone: customer2.phone,
      items: [
        { menuItemId: saffronBiryani.id, quantity: 2, price: 429 },
        { menuItemId: saffronPaneer.id, quantity: 1, price: 329 },
      ],
    },
    {
      userId: customer3.id,
      status: 'CONFIRMED',
      orderType: 'TAKEAWAY',
      subtotal: 728,
      tax: 36.4,
      discount: 0,
      total: 764.4,
      paymentStatus: 'PAID',
      customerName: customer3.name,
      customerEmail: customer3.email,
      customerPhone: customer3.phone,
      items: [
        { menuItemId: saffronPaneer.id, quantity: 1, price: 329 },
        { menuItemId: butterChicken.id, quantity: 1, price: 399 },
      ],
    },
  ];

  for (const o of ordersData) {
    const { items: orderItems, ...orderData } = o;
    const createdOrder = await prisma.order.create({ data: orderData });
    for (const item of orderItems) {
      await prisma.orderItem.create({
        data: {
          orderId: createdOrder.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price,
        },
      });
    }
  }

  // Create Reviews
  const reviews = [
    {
      userId: customer1.id,
      userName: 'Ananya M.',
      menuItemId: saffronPaneer.id,
      rating: 5,
      comment: 'Absolutely loved the Paneer Lababdar and Saffron Paneer Tikka. The smoky charred flavour was unmatched!',
    },
    {
      userId: customer2.id,
      userName: 'Rahul K.',
      menuItemId: butterChicken.id,
      rating: 5,
      comment: 'The ambience, food and service were all fantastic. Butter chicken with Garlic Naan is a must-try.',
    },
    {
      userId: customer3.id,
      userName: 'Priya S.',
      menuItemId: saffronBiryani.id,
      rating: 5,
      comment: 'Best saffron biryani I have had in a long time! Fragrant basmati and succulent chicken.',
    },
    {
      userId: customer4.id,
      userName: 'Aarav M.',
      menuItemId: gulabJamun.id,
      rating: 5,
      comment: 'The Saffron Gulab Jamun melts in your mouth! Premium Indian dining done right.',
    },
  ];

  for (const rev of reviews) {
    await prisma.review.create({ data: rev });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
