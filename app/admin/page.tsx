'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, DollarSign, Calendar, Users, Flame, TrendingUp } from 'lucide-react';

export default function AdminOverviewPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-charcoal-400">Loading Dashboard Analytics...</div>;
  }

  const { stats, recentOrders, topDishes } = data || {};

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-charcoal-900 border border-charcoal-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-saffron-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="font-serif text-3xl font-bold">₹{stats?.totalRevenue?.toFixed(0) || '0'}</p>
          <p className="text-[10px] text-charcoal-400">Today's Revenue: ₹{stats?.todayRevenue?.toFixed(0) || '0'}</p>
        </div>

        <div className="p-6 rounded-3xl bg-charcoal-900 border border-charcoal-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-saffron-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="font-serif text-3xl font-bold">{stats?.totalOrders || 0}</p>
          <p className="text-[10px] text-charcoal-400">All-time culinary orders</p>
        </div>

        <div className="p-6 rounded-3xl bg-charcoal-900 border border-charcoal-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-saffron-400">
            <span className="text-xs font-mono uppercase tracking-wider">Active Reservations</span>
            <Calendar className="w-5 h-5" />
          </div>
          <p className="font-serif text-3xl font-bold">{stats?.activeReservations || 0}</p>
          <p className="text-[10px] text-charcoal-400">Tables booked today</p>
        </div>

        <div className="p-6 rounded-3xl bg-charcoal-900 border border-charcoal-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-saffron-400">
            <span className="text-xs font-mono uppercase tracking-wider">Registered Guests</span>
            <Users className="w-5 h-5" />
          </div>
          <p className="font-serif text-3xl font-bold">{stats?.totalCustomers || 0}</p>
          <p className="text-[10px] text-charcoal-400">Customer accounts</p>
        </div>
      </div>

      {/* Grid: Recent Orders & Top Dishes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="font-serif text-xl font-bold text-cream-100 flex items-center justify-between">
            Recent Customer Orders
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-charcoal-800 text-charcoal-400 font-mono uppercase">
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60">
                {recentOrders?.map((ord: any) => (
                  <tr key={ord.id} className="hover:bg-charcoal-950/60">
                    <td className="py-3 px-2 font-mono text-saffron-400 truncate max-w-[100px]">{ord.id}</td>
                    <td className="py-3 px-2 text-cream-100 font-medium">{ord.customerName || ord.user?.name || 'Guest'}</td>
                    <td className="py-3 px-2">{ord.orderType}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-saffron-500/10 text-saffron-400 border border-saffron-500/30">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-bold text-cream-100">₹{ord.total.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Dishes */}
        <div className="lg:col-span-4 bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="font-serif text-xl font-bold text-cream-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-saffron-400" /> Popular Dishes
          </h2>

          <div className="space-y-3">
            {topDishes?.map((dish: any) => (
              <div key={dish.id} className="flex items-center gap-3 p-2 rounded-2xl bg-charcoal-950 border border-charcoal-800">
                <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold text-xs text-cream-100">{dish.name}</h4>
                  <p className="text-[10px] text-charcoal-400">{dish.category?.name}</p>
                </div>
                <span className="font-bold text-xs text-saffron-400">₹{dish.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
