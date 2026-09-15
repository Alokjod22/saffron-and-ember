'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Leaf, ChefHat, Music, GlassWater, Award } from 'lucide-react';

export default function ExperienceSection() {
  const features = [
    {
      icon: <Flame className="w-8 h-8 text-saffron-400" />,
      title: 'Live Tandoor & Charcoal Embers',
      description: 'Experience intense high-heat clay oven roasting, infusing smoky aromatics into every kebab and naan.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-saffron-400" />,
      title: 'Farm-to-Table Ingredients',
      description: 'Sourced daily from regional organic farms — stone-ground spices, pure Kashmiri saffron, and fresh herbs.',
    },
    {
      icon: <ChefHat className="w-8 h-8 text-saffron-400" />,
      title: 'Chef’s Tasting Table',
      description: 'An exclusive multi-course dining journey curated live by Executive Chef Vikram Sharma.',
    },
    {
      icon: <Music className="w-8 h-8 text-saffron-400" />,
      title: 'Weekend Ambient Evenings',
      description: 'Immerse yourself in modern sitar-fusion beats and handcrafted botanical cocktails every weekend.',
    },
    {
      icon: <GlassWater className="w-8 h-8 text-saffron-400" />,
      title: 'Private Dining Suites',
      description: 'Dedicated regal seating areas for intimate celebrations, corporate dinners, and special milestones.',
    },
    {
      icon: <Award className="w-8 h-8 text-saffron-400" />,
      title: 'Artisanal Mixology',
      description: 'Cocktails and mocktails infused with cardamom, star anise, rose petals, and smoked saffron.',
    },
  ];

  return (
    <section className="py-24 bg-charcoal-950 text-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono text-saffron-400 uppercase tracking-widest">
            The Saffron & Ember Atmosphere
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            More Than Dinner.
          </h2>
          <p className="text-sm text-charcoal-400">
            A feast for the senses where culinary tradition meets contemporary elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-charcoal-900 border border-charcoal-800 hover:border-saffron-500/40 transition-all duration-300 group shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-charcoal-950 border border-charcoal-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-cream-100 mb-2">{feat.title}</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
