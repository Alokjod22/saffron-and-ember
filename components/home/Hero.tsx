'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Star, UtensilsCrossed, Sparkles, Clock, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-charcoal-950 text-cream-100">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron-900/20 via-charcoal-950 to-charcoal-950 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-saffron-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-8 text-center lg:text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Fictional Fine Dining Experience
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cream-100 leading-[1.1]">
            WHERE INDIAN FLAVOURS <br />
            <span className="bg-gradient-to-r from-saffron-400 via-saffron-500 to-amber-200 bg-clip-text text-transparent">
              MEET THE FIRE.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-charcoal-300 max-w-2xl font-light leading-relaxed">
            “Authentic Indian ingredients. Contemporary techniques. Unforgettable plates.”
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-saffron-500/25 hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" /> Explore Menu
            </Link>

            <Link
              href="/reservations"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-charcoal-900 border border-charcoal-700 text-cream-100 hover:text-saffron-400 hover:border-saffron-500/50 font-semibold text-sm tracking-wider uppercase transition-all text-center"
            >
              Reserve a Table
            </Link>
          </div>

          {/* Key Metrics Bar below hero buttons */}
          <div className="pt-8 border-t border-charcoal-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Star className="w-5 h-5 text-saffron-400 fill-saffron-400" />
              <div>
                <p className="text-sm font-bold text-cream-100">4.9 / 5.0</p>
                <p className="text-[11px] text-charcoal-400">Customer Rating</p>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Flame className="w-5 h-5 text-saffron-400" />
              <div>
                <p className="text-sm font-bold text-cream-100">25+ Dishes</p>
                <p className="text-[11px] text-charcoal-400">Signature Recipes</p>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Leaf className="w-5 h-5 text-saffron-400" />
              <div>
                <p className="text-sm font-bold text-cream-100">100% Fresh</p>
                <p className="text-[11px] text-charcoal-400">Daily Ingredients</p>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Clock className="w-5 h-5 text-saffron-400" />
              <div>
                <p className="text-sm font-bold text-cream-100">7 Days</p>
                <p className="text-[11px] text-charcoal-400">Lunch & Dinner</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column Large Food Image Presentation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Glowing Ring Frame */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-saffron-500 to-amber-600 rounded-3xl blur-xl opacity-30 animate-pulse" />

            <div className="relative rounded-3xl overflow-hidden border border-charcoal-800 shadow-2xl bg-charcoal-900 group">
              <img
                src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1200&auto=format&fit=crop"
                alt="Saffron & Ember Signature Butter Chicken"
                className="w-full h-[450px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay Glass Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-charcoal-950/80 backdrop-blur-md border border-charcoal-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-saffron-400 uppercase tracking-wider">Featured Dish</span>
                  <h3 className="font-serif text-base font-bold text-cream-100">Royal Butter Chicken</h3>
                  <p className="text-xs text-charcoal-400">Tandoori smoked chicken in velvety tomato cream</p>
                </div>
                <span className="text-saffron-400 font-bold text-lg">₹449</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
