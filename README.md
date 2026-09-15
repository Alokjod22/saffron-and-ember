# 🍽️ Saffron & Ember — Modern Indian Restaurant Platform

> *"Where Indian Flavours Meet the Fire."*

A full-stack, modern food-tech platform built for **Saffron & Ember** — combining traditional Indian culinary heritage with contemporary wood-fire presentation, real-time menu management, visual table reservations, interactive AI-style food recommendation engine, custom plate builder, cart & checkout, and secure admin analytics.

---

## ✨ Features

- **Modern Indian Culinary Aesthetic**: Premium cream & deep charcoal color palette, saffron accents, dark mode toggle, Framer Motion animations, smooth hover effects & glassmorphism details.
- **Sticky Glassmorphic Navigation**: Desktop & animated mobile drawer, global real-time search modal, theme toggle, cart counter.
- **Hero Section**: Tagline, background visuals, call-to-action buttons, key statistics.
- **Signature Dishes Carousel**: Made to Be Remembered interactive card highlights.
- **Build Your Perfect Plate**: 4-step custom meal builder (Base -> Main -> Side -> Beverage) with real-time price calculations.
- **Smart Food Recommender**: "Tell Us What You're Craving" filter engine based on mood, budget, dietary preference, and spice level.
- **Interactive Menu (`/menu`)**: Filter by 7 categories, vegetarian, vegan, spicy level, popular, price slider, and real-time instant search.
- **Food Detail Modal**: Ingredients list, calories, preparation time, custom spice levels (Mild to Extra Hot), add-on extras (Extra Paneer, Cheese, Mint Chutney), quantity selector.
- **Slide-Out Cart Drawer**: Promo code system (`SAFFRON10` for 10% OFF), tax breakdown (5% GST), subtotal, grand total.
- **Checkout & Order System (`/checkout`)**: Delivery, Takeaway, and Dine-in support, address validation, mock payment gateway (UPI, Card, COD), confirmation page.
- **Visual Table Reservation Portal (`/reservations`)**: Floor plan map with 8 interactive tables (T1 to T8), real-time availability status (🟢 Available, 🟡 Reserved, 🔴 Occupied), double-booking backend validation.
- **Secure Admin Dashboard (`/admin`)**:
  - Analytics overview: Total Revenue, Today's Sales, Active Reservations, Registered Guests.
  - Menu CRUD Operations: Add, edit, delete, toggle availability, featured/popular tags, spice levels.
  - Order Management Workflow: Real-time status transitions (`PENDING` -> `CONFIRMED` -> `PREPARING` -> `READY` -> `COMPLETED` -> `CANCELLED`).
  - Table Reservation Management: Confirm, complete, or cancel table bookings.
- **Authentication**: JWT HTTP-Only session cookies with bcrypt password hashing and role-based access control (`CUSTOMER` & `ADMIN`).

---

## 🔑 Demo Credentials

- **Admin Account**:
  - Email: `admin@saffronandember.com`
  - Password: `Admin123!`
- **Customer Account**:
  - Email: `customer@example.com`
  - Password: `Customer123!`

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Next.js App Router API Routes, Node.js, JWT (`jsonwebtoken`), `bcryptjs`
- **Database**: SQLite / PostgreSQL with Prisma ORM
- **State Management**: React Context (`ThemeContext`, `AuthContext`, `CartContext`)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js v18.0.0 or higher
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `.env` contains:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="saffron-and-ember-secret-key-2026-production-super-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup & Seed
Run Prisma migrations and seed the database with 25+ dishes, sample users, orders, reservations, and reviews:
```bash
npx prisma db push
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
npm run build
npm run start
```
