'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const { setToastMessage } = useCart();

  const fetchReservations = () => {
    fetch('/api/reservations')
      .then((res) => res.json())
      .then((data) => {
        if (data.reservations) setReservations(data.reservations);
      });
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setToastMessage(`Reservation status changed to ${status}`);
        fetchReservations();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Table Reservation Management</h2>

      <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-charcoal-800 text-charcoal-400 font-mono uppercase">
              <th className="py-3 px-2">Table</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Contact</th>
              <th className="py-3 px-2">Date & Time</th>
              <th className="py-3 px-2">Guests</th>
              <th className="py-3 px-2">Special Request</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-800/60">
            {reservations.map((r) => (
              <tr key={r.id} className="hover:bg-charcoal-950/60">
                <td className="py-3 px-2 font-mono font-bold text-saffron-400">{r.tableNumber}</td>
                <td className="py-3 px-2 font-bold text-cream-100">{r.name}</td>
                <td className="py-3 px-2">
                  <p>{r.phone}</p>
                  <p className="text-[10px] text-charcoal-400">{r.email}</p>
                </td>
                <td className="py-3 px-2">{r.date} @ {r.time}</td>
                <td className="py-3 px-2 font-bold">{r.guests} guests</td>
                <td className="py-3 px-2 text-[11px] text-charcoal-400 max-w-xs">{r.specialRequest || '—'}</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      r.status === 'CONFIRMED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : r.status === 'CANCELLED'
                        ? 'bg-red-950 text-red-400 border border-red-500/40'
                        : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-right space-x-1">
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'CONFIRMED')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-700 text-emerald-300 font-bold"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'COMPLETED')}
                    className="px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-700 text-blue-300 font-bold"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'CANCELLED')}
                    className="px-2.5 py-1 rounded-lg bg-red-900/60 hover:bg-red-700 text-red-300 font-bold"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
