'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Flame, Plus, Leaf, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import FoodDetailModal from '@/components/menu/FoodDetailModal';

export default function MenuPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(600);
  const [selectedDish, setSelectedDish] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if (selectedCategory !== 'all') query.set('category', selectedCategory);
    if (search) query.set('search', search);
    if (vegOnly) query.set('vegetarian', 'true');
    if (veganOnly) query.set('vegan', 'true');
    if (spicyOnly) query.set('spicy', '2'); // Spicy filter
    if (popularOnly) query.set('popular', 'true');
    query.set('maxPrice', maxPrice.toString());

    fetch(`/api/menu?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setItems(data.items);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [selectedCategory, search, vegOnly, veganOnly, spicyOnly, popularOnly, maxPrice]);

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono text-saffron-400 uppercase tracking-widest">
            Complete Gastronomic Collection
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
            The Saffron & Ember Menu
          </h1>
          <p className="text-sm text-charcoal-400">
            From smoky clay oven starters to dum-cooked biryanis and artisanal desserts.
          </p>
        </div>

        {/* Search & Category Tabs */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-charcoal-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by dish name, description, ingredients..."
              className="w-full pl-12 pr-4 py-3 bg-charcoal-900 border border-charcoal-800 rounded-2xl text-cream-100 placeholder-charcoal-500 focus:outline-none focus:border-saffron-500 text-sm shadow-xl"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold shadow-lg shadow-saffron-500/20'
                  : 'bg-charcoal-900 border border-charcoal-800 text-charcoal-300 hover:text-cream-100'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold shadow-lg shadow-saffron-500/20'
                    : 'bg-charcoal-900 border border-charcoal-800 text-charcoal-300 hover:text-cream-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Filter Bar Toggles */}
          <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-saffron-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
              </span>
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  vegOnly
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-400 font-bold'
                    : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400'
                }`}
              >
                🌱 Vegetarian
              </button>
              <button
                onClick={() => setVeganOnly(!veganOnly)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  veganOnly
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
                    : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400'
                }`}
              >
                🌿 Vegan
              </button>
              <button
                onClick={() => setSpicyOnly(!spicyOnly)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  spicyOnly
                    ? 'bg-saffron-950 border-saffron-500 text-saffron-400 font-bold'
                    : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400'
                }`}
              >
                🔥 Spicy
              </button>
              <button
                onClick={() => setPopularOnly(!popularOnly)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  popularOnly
                    ? 'bg-amber-950 border-amber-500 text-amber-400 font-bold'
                    : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400'
                }`}
              >
                ❤️ Popular
              </button>
            </div>

            {/* Price Slider */}
            <div className="flex items-center gap-3 min-w-[200px]">
              <span className="text-charcoal-400 whitespace-nowrap">Max Price: <strong className="text-saffron-400">₹{maxPrice}</strong></span>
              <input
                type="range"
                min="60"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-saffron-500"
              />
            </div>
          </div>
        </div>

        {/* Dishes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-3xl bg-charcoal-900 border border-charcoal-800 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-charcoal-400 space-y-3">
            <p className="font-serif text-xl text-cream-100">No dishes match your filter criteria.</p>
            <p className="text-xs">Try clearing some filters or searching for another dish.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-charcoal-900 border border-charcoal-800 rounded-3xl overflow-hidden hover:border-saffron-500/40 transition-all duration-300 group shadow-xl flex flex-col justify-between"
              >
                {/* Image */}
                <div
                  onClick={() => setSelectedDish(dish)}
                  className="relative h-56 overflow-hidden cursor-pointer"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        dish.vegetarian
                          ? 'border-emerald-500 bg-emerald-950/80 text-emerald-400'
                          : 'border-red-500 bg-red-950/80 text-red-400'
                      }`}
                    >
                      {dish.vegetarian ? '🌱 Veg' : '🍗 Non-Veg'}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-charcoal-950/80 backdrop-blur-md border border-charcoal-800 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs text-saffron-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-saffron-400" /> {dish.avgRating || '4.8'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => setSelectedDish(dish)}
                      className="font-serif text-xl font-bold text-cream-100 group-hover:text-saffron-400 transition-colors cursor-pointer"
                    >
                      {dish.name}
                    </h3>
                    <p className="text-xs text-charcoal-400 line-clamp-2 mt-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-charcoal-800/80">
                    <div>
                      <span className="text-xs text-charcoal-400 block">Price</span>
                      <span className="font-bold text-xl text-saffron-400">₹{dish.price}</span>
                    </div>

                    <button
                      onClick={() =>
                        addToCart({
                          menuItemId: dish.id,
                          name: dish.name,
                          price: dish.price,
                          image: dish.image,
                        })
                      }
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-saffron-500/10 hover:bg-saffron-500 text-saffron-400 hover:text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedDish && (
        <FoodDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </div>
  );
}
