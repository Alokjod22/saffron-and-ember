'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import TableSelector, { TableInfo } from '@/components/reservation/TableSelector';
import { useAuth } from '@/context/AuthContext';

export default function ReservationsPage() {
  const { user } = useAuth();
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [selectedTable, setSelectedTable] = useState('T1');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);

  // Time Slots
  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  // Table Data (T1 to T8)
  const [tables, setTables] = useState<TableInfo[]>([
    { number: 'T1', seats: 2, type: 'Window Pair', status: 'AVAILABLE' },
    { number: 'T2', seats: 4, type: 'Center Dining', status: 'AVAILABLE' },
    { number: 'T3', seats: 4, type: 'Booth Seating', status: 'AVAILABLE' },
    { number: 'T4', seats: 2, type: 'Window Pair', status: 'AVAILABLE' },
    { number: 'T5', seats: 6, type: 'Family Table', status: 'AVAILABLE' },
    { number: 'T6', seats: 4, type: 'Center Dining', status: 'AVAILABLE' },
    { number: 'T7', seats: 8, type: 'VIP Royal Suite', status: 'AVAILABLE' },
    { number: 'T8', seats: 2, type: 'Garden View', status: 'AVAILABLE' },
  ]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.phone) setPhone(user.phone);
    }
  }, [user]);

  // Fetch existing reservations for selected date to update table availability
  useEffect(() => {
    fetch(`/api/reservations?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.reservations) {
          const reservedTableNumbers = new Set(
            data.reservations
              .filter((r: any) => r.status === 'CONFIRMED' || r.status === 'PENDING')
              .map((r: any) => r.tableNumber)
          );

          setTables((prev) =>
            prev.map((tbl) => ({
              ...tbl,
              status: reservedTableNumbers.has(tbl.number) ? 'RESERVED' : 'AVAILABLE',
            }))
          );
        }
      })
      .catch((e) => console.error(e));
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          date,
          time,
          guests,
          tableNumber: selectedTable,
          specialRequest,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete reservation');
      }

      setConfirmedReservation(data.reservation);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-cream-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Table Reservation Portal
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
            Reserve Your Experience
          </h1>
          <p className="text-sm text-charcoal-400">
            Select your preferred dining date, time, and interactive table number.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-charcoal-900 border border-saffron-500/50 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-saffron-400 uppercase tracking-widest font-bold">
                Table Reserved 🎉
              </span>
              <h2 className="font-serif text-3xl font-bold">Reservation Confirmed!</h2>
              <p className="text-xs text-charcoal-400">
                We have saved table <strong className="text-saffron-400">{confirmedReservation.tableNumber}</strong> for you. A confirmation email has been sent.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-charcoal-950 border border-charcoal-800 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-charcoal-800 pb-2">
                <span className="text-charcoal-400">Reservation ID:</span>
                <span className="font-mono text-saffron-400 font-bold">{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between border-b border-charcoal-800 pb-2">
                <span className="text-charcoal-400">Guest Name:</span>
                <span className="font-semibold text-cream-100">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between border-b border-charcoal-800 pb-2">
                <span className="text-charcoal-400">Date & Time:</span>
                <span className="font-semibold text-cream-100">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between border-b border-charcoal-800 pb-2">
                <span className="text-charcoal-400">Guests & Table:</span>
                <span className="font-semibold text-cream-100">{confirmedReservation.guests} Guests • Table {confirmedReservation.tableNumber}</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Make Another Reservation
            </button>
          </motion.div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-12">
            {error && (
              <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500 text-red-300 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Date, Time & Guests */}
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="font-serif text-xl font-bold text-saffron-400">
                1. Party Size, Date & Time Slot
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:outline-none focus:border-saffron-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-2">
                    Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:outline-none focus:border-saffron-500"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Visual Table Selector */}
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="font-serif text-xl font-bold text-saffron-400">
                2. Select Table Location
              </h2>
              <TableSelector
                tables={tables}
                selectedTable={selectedTable}
                onSelectTable={(tblNum) => setSelectedTable(tblNum)}
              />
            </div>

            {/* Step 3: Guest Details */}
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="font-serif text-xl font-bold text-saffron-400">
                3. Primary Guest Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Malhotra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:outline-none focus:border-saffron-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Anniversary, birthday cake, window seating preference..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:outline-none focus:border-saffron-500"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-saffron-500/20 hover:scale-105 transition-all"
                >
                  {loading ? 'Confirming Table...' : 'Confirm Table Reservation'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
