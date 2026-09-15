'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  Calendar,
  Users,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'ADMIN') {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'ADMIN') {
    return (
      <div className="pt-32 pb-24 bg-charcoal-950 text-cream-100 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-saffron-400 mx-auto animate-pulse" />
          <p className="font-serif text-lg">Verifying Admin Privileges...</p>
        </div>
      </div>
    );
  }

  const adminNav = [
    { name: 'Overview', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Menu Items', href: '/admin/menu', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Reservations', href: '/admin/reservations', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-24 pb-16 bg-charcoal-950 text-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">Saffron & Ember Admin Control</h1>
              <p className="text-xs text-charcoal-400">Authenticated as {user.name} ({user.email})</p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-charcoal-300 hover:text-saffron-400 self-start sm:self-auto px-4 py-2 rounded-xl bg-charcoal-900 border border-charcoal-800"
          >
            <ArrowLeft className="w-4 h-4" /> Back To Customer Site
          </Link>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-charcoal-800/60">
          {adminNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-saffron-500 text-charcoal-950 shadow-lg shadow-saffron-500/20'
                    : 'bg-charcoal-900 border border-charcoal-800 text-charcoal-300 hover:text-cream-100'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </div>

        {children}
      </div>
    </div>
  );
}
