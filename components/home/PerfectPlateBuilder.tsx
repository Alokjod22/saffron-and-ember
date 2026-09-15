'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ShoppingBag, Plus, RefreshCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface StepOption {
  name: string;
  price: number;
  image: string;
}

export default function PerfectPlateBuilder() {
  const { addToCart } = useCart();

  const bases: StepOption[] = [
    { name: 'Saffron Basmati Rice', price: 149, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400&auto=format&fit=crop' },
    { name: 'Butter Garlic Naan', price: 109, image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=400&auto=format&fit=crop' },
    { name: 'Tandoori Roti (2 pcs)', price: 99, image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=400&auto=format&fit=crop' },
  ];

  const mains: StepOption[] = [
    { name: 'Butter Chicken', price: 449, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400&auto=format&fit=crop' },
    { name: 'Paneer Lababdar', price: 399, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400&auto=format&fit=crop' },
    { name: 'Dal Makhani', price: 329, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Vegetable Korma', price: 359, image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=400&auto=format&fit=crop' },
  ];

  const sides: StepOption[] = [
    { name: 'Cucumber Mint Raita', price: 79, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop' },
    { name: 'Kachumber Salad', price: 69, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop' },
    { name: 'Masala Papad (2 pcs)', price: 59, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop' },
  ];

  const drinks: StepOption[] = [
    { name: 'Saffron Lassi', price: 149, image: 'https://images.unsplash.com/photo-1571006682860-032034e341dd?q=80&w=400&auto=format&fit=crop' },
    { name: 'Masala Chaas', price: 99, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=400&auto=format&fit=crop' },
    { name: 'Fresh Lime Soda', price: 119, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop' },
  ];

  const [selectedBase, setSelectedBase] = useState<StepOption>(bases[0]);
  const [selectedMain, setSelectedMain] = useState<StepOption>(mains[0]);
  const [selectedSide, setSelectedSide] = useState<StepOption>(sides[0]);
  const [selectedDrink, setSelectedDrink] = useState<StepOption>(drinks[0]);

  const plateTotal = selectedBase.price + selectedMain.price + selectedSide.price + selectedDrink.price;

  const handleAddPlateToCart = () => {
    addToCart({
      menuItemId: `custom-plate-${Date.now()}`,
      name: `Custom Perfect Plate (${selectedMain.name})`,
      price: plateTotal,
      image: selectedMain.image,
      customizations: {
        note: `Base: ${selectedBase.name}, Side: ${selectedSide.name}, Drink: ${selectedDrink.name}`,
      },
    });
  };

  return (
    <section className="py-24 bg-charcoal-950 text-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Culinary Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Build Your Perfect Plate
          </h2>
          <p className="text-sm text-charcoal-400">
            Combine your favourite base, authentic gravy main, crisp side, and refreshing beverage for a complete royal meal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Steps Options Grid */}
          <div className="lg:col-span-8 space-y-10">
            {/* Step 1: Base */}
            <div>
              <h3 className="text-sm font-mono text-saffron-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-xs">1</span> Choose Your Base
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {bases.map((opt) => {
                  const isSelected = selectedBase.name === opt.name;
                  return (
                    <div
                      key={opt.name}
                      onClick={() => setSelectedBase(opt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-saffron-500/10 border-saffron-500 shadow-lg shadow-saffron-500/10'
                          : 'bg-charcoal-900 border-charcoal-800 hover:border-charcoal-700'
                      }`}
                    >
                      <img src={opt.image} alt={opt.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-cream-100">{opt.name}</p>
                        <p className="text-xs text-saffron-400 font-bold">₹{opt.price}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-saffron-400" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Main */}
            <div>
              <h3 className="text-sm font-mono text-saffron-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-xs">2</span> Choose Your Main Gravy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mains.map((opt) => {
                  const isSelected = selectedMain.name === opt.name;
                  return (
                    <div
                      key={opt.name}
                      onClick={() => setSelectedMain(opt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-saffron-500/10 border-saffron-500 shadow-lg shadow-saffron-500/10'
                          : 'bg-charcoal-900 border-charcoal-800 hover:border-charcoal-700'
                      }`}
                    >
                      <img src={opt.image} alt={opt.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-cream-100">{opt.name}</p>
                        <p className="text-xs text-saffron-400 font-bold">₹{opt.price}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-saffron-400" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Side */}
            <div>
              <h3 className="text-sm font-mono text-saffron-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-xs">3</span> Choose A Side
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sides.map((opt) => {
                  const isSelected = selectedSide.name === opt.name;
                  return (
                    <div
                      key={opt.name}
                      onClick={() => setSelectedSide(opt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-saffron-500/10 border-saffron-500 shadow-lg shadow-saffron-500/10'
                          : 'bg-charcoal-900 border-charcoal-800 hover:border-charcoal-700'
                      }`}
                    >
                      <img src={opt.image} alt={opt.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-cream-100">{opt.name}</p>
                        <p className="text-xs text-saffron-400 font-bold">₹{opt.price}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-saffron-400" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Drink */}
            <div>
              <h3 className="text-sm font-mono text-saffron-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-xs">4</span> Choose A Beverage
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {drinks.map((opt) => {
                  const isSelected = selectedDrink.name === opt.name;
                  return (
                    <div
                      key={opt.name}
                      onClick={() => setSelectedDrink(opt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-saffron-500/10 border-saffron-500 shadow-lg shadow-saffron-500/10'
                          : 'bg-charcoal-900 border-charcoal-800 hover:border-charcoal-700'
                      }`}
                    >
                      <img src={opt.image} alt={opt.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-cream-100">{opt.name}</p>
                        <p className="text-xs text-saffron-400 font-bold">₹{opt.price}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-saffron-400" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Order Summary Card */}
          <div className="lg:col-span-4 sticky top-28 bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <h3 className="font-serif text-xl font-bold border-b border-charcoal-800 pb-3 flex items-center justify-between">
              Your Perfect Plate Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-charcoal-800/60">
                <span className="text-charcoal-400">Base:</span>
                <span className="font-semibold text-cream-100">{selectedBase.name} (₹{selectedBase.price})</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-charcoal-800/60">
                <span className="text-charcoal-400">Main:</span>
                <span className="font-semibold text-cream-100">{selectedMain.name} (₹{selectedMain.price})</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-charcoal-800/60">
                <span className="text-charcoal-400">Side:</span>
                <span className="font-semibold text-cream-100">{selectedSide.name} (₹{selectedSide.price})</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-charcoal-800/60">
                <span className="text-charcoal-400">Drink:</span>
                <span className="font-semibold text-cream-100">{selectedDrink.name} (₹{selectedDrink.price})</span>
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-charcoal-400 block">Total Plate Price</span>
                <span className="text-2xl font-bold text-saffron-400">₹{plateTotal}</span>
              </div>

              <button
                onClick={handleAddPlateToCart}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-saffron-500/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add Plate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
