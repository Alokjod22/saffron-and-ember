'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Plus, RefreshCw, Compass } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import FoodDetailModal from '@/components/menu/FoodDetailModal';

export default function SmartRecommender() {
  const [mood, setMood] = useState('Comfort Food');
  const [budget, setBudget] = useState(350);
  const [preference, setPreference] = useState('Anything');
  const [spice, setSpice] = useState('Medium');

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedDish, setSelectedDish] = useState<any | null>(null);
  const { addToCart } = useCart();

  const handleRecommend = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      if (!data.items) return;

      let filtered = data.items.filter((item: any) => {
        // Budget filter
        if (item.price > budget) return false;
        // Preference filter
        if (preference === 'Vegetarian' && !item.vegetarian) return false;
        if (preference === 'Non-Vegetarian' && item.vegetarian) return false;
        if (preference === 'Vegan' && !item.vegan) return false;
        return true;
      });

      if (filtered.length < 3) {
        filtered = data.items.slice(0, 3);
      }

      const picks = filtered.slice(0, 3).map((item: any) => ({
        ...item,
        reason: `Perfect match for your ${mood.toLowerCase()} mood, under ₹${budget} budget, with authentic spice level.`,
      }));

      setRecommendations(picks);
      setHasSearched(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="py-24 bg-charcoal-900 border-t border-b border-charcoal-800/80 text-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 font-mono text-xs uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" /> AI-Style Food Recommendation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Tell Us What You're Craving
          </h2>
          <p className="text-sm text-charcoal-400">
            Select your mood, budget, and spice preferences. Our smart culinary engine will curate the ideal 3 dishes for you.
          </p>
        </div>

        {/* Wizard Controls */}
        <div className="max-w-4xl mx-auto bg-charcoal-950 border border-charcoal-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 mb-16">
          {/* Mood */}
          <div>
            <label className="block text-xs font-mono text-saffron-400 uppercase tracking-widest mb-3">
              1. What's your mood?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { name: 'Comfort Food', icon: '😌' },
                { name: 'Something Spicy', icon: '🔥' },
                { name: 'Light & Healthy', icon: '🥗' },
                { name: 'Proper Meal', icon: '🍛' },
                { name: 'Something Sweet', icon: '🍰' },
              ].map((m) => (
                <button
                  key={m.name}
                  onClick={() => setMood(m.name)}
                  className={`p-3 rounded-2xl border text-xs font-medium transition-all flex flex-col items-center gap-1.5 ${
                    mood === m.name
                      ? 'bg-saffron-500/10 border-saffron-500 text-saffron-400 font-bold'
                      : 'bg-charcoal-900 border-charcoal-800 text-charcoal-300 hover:border-charcoal-700'
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget & Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Budget */}
            <div>
              <label className="block text-xs font-mono text-saffron-400 uppercase tracking-widest mb-3">
                2. Your Budget per dish?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[150, 250, 350, 500].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all ${
                      budget === b
                        ? 'bg-saffron-500/10 border-saffron-500 text-saffron-400'
                        : 'bg-charcoal-900 border-charcoal-800 text-charcoal-300'
                    }`}
                  >
                    ₹{b}{b === 500 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Preference */}
            <div>
              <label className="block text-xs font-mono text-saffron-400 uppercase tracking-widest mb-3">
                3. Dietary Preference?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Anything', 'Vegetarian', 'Non-Vegetarian', 'Vegan'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPreference(p)}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all truncate ${
                      preference === p
                        ? 'bg-saffron-500/10 border-saffron-500 text-saffron-400'
                        : 'bg-charcoal-900 border-charcoal-800 text-charcoal-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Spice level */}
            <div>
              <label className="block text-xs font-mono text-saffron-400 uppercase tracking-widest mb-3">
                4. Spice level preference?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Mild', 'Medium', 'Hot', 'Extra Hot'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpice(s)}
                    className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all ${
                      spice === s
                        ? 'bg-saffron-500/10 border-saffron-500 text-saffron-400'
                        : 'bg-charcoal-900 border-charcoal-800 text-charcoal-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleRecommend}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-saffron-500/20 hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Get Recommendations
            </button>
          </div>
        </div>

        {/* Results Container */}
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-2xl font-bold text-center mb-8">
              We Picked These 3 Dishes Just For You
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((item) => (
                <div
                  key={item.id}
                  className="bg-charcoal-950 border border-charcoal-800 rounded-3xl overflow-hidden hover:border-saffron-500/40 transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      onClick={() => setSelectedDish(item)}
                      className="w-full h-44 object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity mb-4"
                    />
                    <h4 className="font-serif text-lg font-bold text-cream-100">{item.name}</h4>
                    <span className="text-saffron-400 font-bold text-base block mt-1">₹{item.price}</span>

                    <div className="mt-3 p-3 rounded-xl bg-charcoal-900 border border-charcoal-800/80 text-xs text-charcoal-300">
                      <span className="font-bold text-saffron-400 block mb-1">Why we picked this:</span>
                      {item.reason}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      addToCart({
                        menuItemId: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="w-full mt-6 py-2.5 rounded-xl bg-saffron-500/10 hover:bg-saffron-500 text-saffron-400 hover:text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {selectedDish && (
        <FoodDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
}
