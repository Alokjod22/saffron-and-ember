'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const { setToastMessage } = useCart();

  const fetchOrders = () => {
    const q = filterStatus !== 'ALL' ? `?status=${filterStatus}` : '';
    fetch(`/api/orders${q}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setToastMessage(`Order status updated to ${status}`);
        fetchOrders();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const statusOptions = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-bold">Order Management Workflow</h2>

        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-4 py-2 rounded-full font-bold ${
              filterStatus === 'ALL' ? 'bg-saffron-500 text-charcoal-950' : 'bg-charcoal-900 text-charcoal-300'
            }`}
          >
            All Orders
          </button>
          {statusOptions.map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-full font-bold ${
                filterStatus === st ? 'bg-saffron-500 text-charcoal-950' : 'bg-charcoal-900 text-charcoal-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-charcoal-800 text-charcoal-400 font-mono uppercase">
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">Customer & Contact</th>
              <th className="py-3 px-2">Items</th>
              <th className="py-3 px-2">Total</th>
              <th className="py-3 px-2">Type</th>
              <th className="py-3 px-2">Current Status</th>
              <th className="py-3 px-2 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-800/60">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-charcoal-950/60">
                <td className="py-3 px-2 font-mono text-saffron-400 font-bold">{ord.id.substring(0, 8)}...</td>
                <td className="py-3 px-2">
                  <p className="font-semibold text-cream-100">{ord.customerName || ord.user?.name || 'Guest'}</p>
                  <p className="text-[10px] text-charcoal-400">{ord.customerPhone || ord.customerEmail}</p>
                </td>
                <td className="py-3 px-2">
                  {ord.orderItems?.map((i: any) => (
                    <div key={i.id} className="text-[11px] text-charcoal-300">
                      {i.quantity}× {i.menuItem?.name}
                    </div>
                  ))}
                </td>
                <td className="py-3 px-2 font-bold text-saffron-400">₹{ord.total.toFixed(0)}</td>
                <td className="py-3 px-2">{ord.orderType}</td>
                <td className="py-3 px-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-saffron-500/20 text-saffron-400 border border-saffron-500/40">
                    {ord.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <select
                    value={ord.status}
                    onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                    className="p-2 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:border-saffron-500"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
