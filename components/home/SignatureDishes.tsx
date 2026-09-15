'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Plus, Leaf, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import FoodDetailModal from '@/components/menu/FoodDetailModal';

export default function SignatureDishes() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [selectedDish, setSelectedDish] = useState<any | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/menu?featured=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setDishes(data.items.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  const renderSpiceIcons = (level: number) => {
    if (level === 0) return null;
    return (
      <div className="flex items-center gap-0.5 text-saffron-500">
        {Array.from({ length: level }).map((_, i) => (
          <Flame key={i} className="w-3.5 h-3.5 fill-saffron-500" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-charcoal-900 border-t border-b border-charcoal-800/60 relative overflow-hidden text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-saffron-400 uppercase tracking-widest">Crafted By Our Master Chefs</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mt-1 text-cream-100">
              Made to Be Remembered
            </h2>
          </div>
          <p className="text-sm text-charcoal-400 max-w-md mt-4 md:mt-0">
            Handpicked signature creations that define the essence of modern Indian wood-fire dining.
          </p>
        </div>

        {/* Featured Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-charcoal-950 border border-charcoal-800 rounded-3xl overflow-hidden hover:border-saffron-500/40 transition-all duration-300 group shadow-xl flex flex-col"
            >
              {/* Image Container */}
              <div
                onClick={() => setSelectedDish(dish)}
                className="relative h-60 overflow-hidden cursor-pointer"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80" />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center border text-[10px] font-bold ${
                      dish.vegetarian
                        ? 'border-emerald-500 bg-emerald-950/80 text-emerald-400'
                        : 'border-red-500 bg-red-950/80 text-red-400'
                    }`}
                  >
                    {dish.vegetarian ? '🌱' : '🍗'}
                  </span>
                  {dish.spicyLevel > 0 && (
                    <div className="px-2 py-0.5 rounded-full bg-charcoal-900/80 backdrop-blur-md border border-charcoal-700 flex items-center gap-1">
                      {renderSpiceIcons(dish.spicyLevel)}
                    </div>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-charcoal-900/80 backdrop-blur-md border border-charcoal-700 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs text-saffron-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-saffron-400" /> {dish.avgRating || '4.8'}
                </div>
              </div>

              {/* Card Body */}
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
      </div>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <FoodDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
}
