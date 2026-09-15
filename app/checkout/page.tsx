'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, subtotal, discountAmount, tax, total, clearCart, promoCode } = useCart();
  const { user } = useAuth();

  const [orderType, setOrderType] = useState<'DELIVERY' | 'TAKEAWAY' | 'DINE_IN'>('DELIVERY');
  const [customerName, setCustomerName] = useState(user ? user.name : '');
  const [customerEmail, setCustomerEmail] = useState(user ? user.email : '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState('21 Marine Drive, Apt 4B, Mumbai 400020');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'CARD'>('UPI');

  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length) return;

    setLoading(true);

    try {
      const orderPayload = {
        items: cart.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price,
          customizations: item.customizations,
        })),
        orderType,
        subtotal,
        tax,
        discount: discountAmount,
        total,
        paymentMethod,
        deliveryAddress: orderType === 'DELIVERY' ? deliveryAddress : null,
        customerName,
        customerEmail,
        customerPhone,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      setConfirmedOrder(data.order);
      clearCart();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (confirmedOrder) {
    return (
      <div className="pt-28 pb-24 bg-charcoal-950 text-cream-100 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-charcoal-900 border border-saffron-500/50 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-saffron-400 uppercase tracking-widest font-bold">
              ORDER CONFIRMED 🎉
            </span>
            <h1 className="font-serif text-3xl font-bold">“Your food is being prepared with love.”</h1>
            <p className="text-xs text-charcoal-400">
              Thank you for ordering with Saffron & Ember.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-charcoal-950 border border-charcoal-800 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-charcoal-800 pb-2">
              <span className="text-charcoal-400">Order ID:</span>
              <span className="font-mono text-saffron-400 font-bold">{confirmedOrder.id}</span>
            </div>
            <div className="flex justify-between border-b border-charcoal-800 pb-2">
              <span className="text-charcoal-400">Order Type:</span>
              <span className="font-semibold text-cream-100">{confirmedOrder.orderType}</span>
            </div>
            <div className="flex justify-between border-b border-charcoal-800 pb-2">
              <span className="text-charcoal-400">Estimated Prep Time:</span>
              <span className="font-semibold text-cream-100">25 - 35 mins</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-saffron-400 pt-1">
              <span>Total Amount Paid:</span>
              <span>₹{confirmedOrder.total.toFixed(0)}</span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            Return To Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 bg-charcoal-950 text-cream-100 min-h-screen text-center px-4">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="font-serif text-2xl font-bold">Your Cart is Empty</h2>
          <p className="text-xs text-charcoal-400">Add items from our menu before checking out.</p>
          <Link
            href="/menu"
            className="inline-block px-6 py-3 rounded-full bg-saffron-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-cream-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-8">
          Checkout & Order Confirmation
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Order Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Order Type */}
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-bold text-saffron-400">1. Order Type</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'DELIVERY', label: '🛵 Delivery' },
                  { type: 'TAKEAWAY', label: '🛍️ Takeaway' },
                  { type: 'DINE_IN', label: '🍽️ Dine-in' },
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setOrderType(item.type as any)}
                    className={`py-3 px-2 rounded-2xl border text-xs font-semibold transition-all ${
                      orderType === item.type
                        ? 'bg-saffron-500/20 border-saffron-500 text-saffron-400'
                        : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-bold text-saffron-400">2. Customer Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-charcoal-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                  />
                </div>
                <div>
                  <label className="block text-charcoal-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 90000 12345"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                  />
                </div>
              </div>
              <div className="text-xs">
                <label className="block text-charcoal-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                />
              </div>

              {orderType === 'DELIVERY' && (
                <div className="text-xs">
                  <label className="block text-charcoal-400 mb-1">Delivery Address</label>
                  <textarea
                    required
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-bold text-saffron-400">3. Payment Option</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                  { id: 'CARD', label: 'Credit/Debit Card', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'COD', label: 'Cash On Delivery', icon: <Banknote className="w-4 h-4" /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-3.5 px-2 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === m.id
                        ? 'bg-saffron-500/20 border-saffron-500 text-saffron-400'
                        : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400'
                    }`}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 space-y-6 self-start shadow-2xl">
            <h2 className="font-serif text-xl font-bold border-b border-charcoal-800 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-charcoal-800/60">
                  <div>
                    <p className="font-semibold text-cream-100">{item.name} × {item.quantity}</p>
                    <p className="text-[10px] text-charcoal-400">
                      {item.customizations?.spiceLevel && `Spice: ${item.customizations.spiceLevel}`}
                    </p>
                  </div>
                  <span className="font-bold text-saffron-400">₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-charcoal-300 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-saffron-400 font-medium">
                  <span>Discount ({promoCode})</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax (5% GST)</span>
                <span>₹{tax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-cream-100 pt-3 border-t border-charcoal-800">
                <span>Grand Total</span>
                <span className="text-saffron-400">₹{total.toFixed(0)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-saffron-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Processing Payment...' : 'Place Order Now'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
