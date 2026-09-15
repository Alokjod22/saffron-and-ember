'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    tax,
    total,
    applyPromoCode,
    promoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyPromoCode(inputCode);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm z-50"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-charcoal-900 border-l border-charcoal-800 z-50 flex flex-col shadow-2xl text-cream-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-charcoal-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-saffron-500/10 text-saffron-400 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">Your Order Cart</h3>
                  <p className="text-xs text-charcoal-400">{cart.length} item(s) selected</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full text-charcoal-400 hover:text-cream-100 hover:bg-charcoal-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-charcoal-400 py-12">
                  <div className="w-16 h-16 rounded-full bg-charcoal-800 flex items-center justify-center mb-4 text-charcoal-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-serif text-lg text-cream-100 mb-1">Your cart is empty</p>
                  <p className="text-xs text-charcoal-400 max-w-xs mb-6">
                    Discover our authentic tandoori and saffron delicacies.
                  </p>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-full bg-saffron-500 text-charcoal-950 font-semibold text-xs tracking-wider uppercase hover:bg-saffron-400 transition-colors"
                  >
                    Explore Menu
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-charcoal-950/60 border border-charcoal-800/80"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm text-cream-100">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-charcoal-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Badges */}
                      {item.customizations && (
                        <div className="text-[11px] text-charcoal-400 mt-1 space-y-0.5">
                          {item.customizations.spiceLevel && (
                            <p>🌶️ Spice: <span className="text-saffron-400 capitalize">{item.customizations.spiceLevel}</span></p>
                          )}
                          {item.customizations.extras && item.customizations.extras.length > 0 && (
                            <p>
                              + {item.customizations.extras.map((e) => e.name).join(', ')}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-saffron-400 font-bold text-sm">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>

                        <div className="flex items-center gap-2 bg-charcoal-800 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-charcoal-300 hover:text-saffron-400"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-cream-100 px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-charcoal-300 hover:text-saffron-400"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code & Totals Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-charcoal-800 bg-charcoal-950/80 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 w-4 h-4 text-charcoal-400" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SAFFRON10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-charcoal-900 border border-charcoal-700 rounded-xl text-cream-100 uppercase focus:outline-none focus:border-saffron-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-saffron-400 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoCode && (
                  <p className="text-xs text-saffron-400 flex items-center gap-1 font-medium">
                    ✓ Promo code {promoCode} active (10% Discount applied)
                  </p>
                )}

                {/* Subtotal, Tax, Discount Breakdown */}
                <div className="space-y-1.5 text-xs text-charcoal-300 border-t border-charcoal-800 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-saffron-400 font-medium">
                      <span>Discount (10%)</span>
                      <span>-₹{discountAmount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Tax (5% GST)</span>
                    <span>₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-cream-100 pt-2 border-t border-charcoal-800">
                    <span>Grand Total</span>
                    <span className="text-saffron-400">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold uppercase tracking-wider text-xs shadow-lg shadow-saffron-500/20 hover:scale-[1.02] transition-transform"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
