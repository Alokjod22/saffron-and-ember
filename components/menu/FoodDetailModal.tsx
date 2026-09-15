'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Clock, Zap, Plus, Minus, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface FoodDetailModalProps {
  dish: any;
  onClose: () => void;
}

export default function FoodDetailModal({ dish, onClose }: FoodDetailModalProps) {
  const { addToCart } = useCart();
  const [selectedSpice, setSelectedSpice] = useState('Medium');
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);

  const availableExtras = [
    { name: 'Extra Paneer', price: 70 },
    { name: 'Cheese Top', price: 50 },
    { name: 'Mint Chutney Dip', price: 30 },
  ];

  const toggleExtra = (extra: { name: string; price: number }) => {
    if (selectedExtras.some((e) => e.name === extra.name)) {
      setSelectedExtras((prev) => prev.filter((e) => e.name !== extra.name));
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };

  const extrasCost = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const itemTotalPrice = (dish.price + extrasCost) * quantity;

  const handleAddToCart = () => {
    addToCart({
      menuItemId: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity,
      customizations: {
        spiceLevel: selectedSpice,
        extras: selectedExtras,
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-charcoal-900 border border-charcoal-800 rounded-3xl overflow-hidden shadow-2xl relative text-cream-100 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-charcoal-950/80 text-charcoal-300 hover:text-cream-100 flex items-center justify-center border border-charcoal-800"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dish Image Banner */}
          <div className="relative h-64 sm:h-72 overflow-hidden">
            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    dish.vegetarian
                      ? 'border-emerald-500 bg-emerald-950/80 text-emerald-400'
                      : 'border-red-500 bg-red-950/80 text-red-400'
                  }`}
                >
                  {dish.vegetarian ? '🌱 Vegetarian' : '🍗 Non-Vegetarian'}
                </span>
                {dish.vegan && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-400 bg-emerald-900/80 text-emerald-300">
                    🌿 Vegan
                  </span>
                )}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">{dish.name}</h2>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 space-y-6">
            <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed">
              {dish.description}
            </p>

            {/* Quick Metrics (Calories, Prep Time, Rating) */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-charcoal-950 border border-charcoal-800/80 text-center">
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase font-mono block">Preparation</span>
                <span className="text-xs font-bold text-cream-100 flex items-center justify-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-saffron-400" /> {dish.preparationTime || '20 mins'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase font-mono block">Energy</span>
                <span className="text-xs font-bold text-cream-100 flex items-center justify-center gap-1 mt-0.5">
                  <Zap className="w-3.5 h-3.5 text-saffron-400" /> {dish.calories || 450} kcal
                </span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase font-mono block">Spice Level</span>
                <span className="text-xs font-bold text-saffron-400 flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5" /> Level {dish.spicyLevel || 1}
                </span>
              </div>
            </div>

            {/* Customization 1: Spice Preference */}
            <div>
              <label className="block text-xs font-mono text-saffron-400 uppercase tracking-widest mb-2">
                Custom Spice Preference
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Mild', 'Medium', 'Hot', 'Extra Hot'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedSpice(level)}
                    className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all ${
                      selectedSpice === level
                        ? 'bg-saffron-500/10 border-saffron-500 text-saffron-400'
                        : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400 hover:border-charcoal-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization 2: Add-on Extras */}
            <div>
              <label className="block text-xs font-mono text-saffron-400 uppercase tracking-widest mb-2">
                Add-on Extras
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {availableExtras.map((extra) => {
                  const isChecked = selectedExtras.some((e) => e.name === extra.name);
                  return (
                    <div
                      key={extra.name}
                      onClick={() => toggleExtra(extra)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        isChecked
                          ? 'bg-saffron-500/10 border-saffron-500 text-saffron-400 font-semibold'
                          : 'bg-charcoal-950 border-charcoal-800 text-charcoal-300'
                      }`}
                    >
                      <span>{extra.name}</span>
                      <span className="font-bold">+₹{extra.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 bg-charcoal-950 border border-charcoal-800 rounded-2xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-charcoal-900 text-cream-100 hover:text-saffron-400 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-charcoal-900 text-cream-100 hover:text-saffron-400 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-saffron-500/20 hover:scale-[1.02] transition-transform text-center"
              >
                Add {quantity} To Cart • ₹{itemTotalPrice}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
