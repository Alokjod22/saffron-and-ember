'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Heart, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-cream-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono text-saffron-400 uppercase tracking-widest">Our Culinary Legacy</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
            A Modern Indian Kitchen With an Old Soul
          </h1>
          <p className="text-base text-charcoal-300 font-light leading-relaxed">
            “Saffron & Ember was born from a simple idea — Indian food deserves to be celebrated not only for its incredible flavours, but for the stories, people and traditions behind every dish.”
          </p>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-charcoal-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
              alt="Saffron & Ember Kitchen"
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-saffron-400">Our Philosophy</h2>
            <p className="text-sm text-charcoal-300 leading-relaxed">
              We marry centuries-old tandoori clay oven methods with contemporary plating and refined techniques. Every spice mix is roasted and ground in-house daily to ensure uncompromised depth.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
                <span className="text-saffron-400 block text-lg font-bold font-serif mb-1">Pure Saffron</span>
                <span className="text-charcoal-400">Directly sourced from Kashmir</span>
              </div>
              <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
                <span className="text-saffron-400 block text-lg font-bold font-serif mb-1">Charcoal Fire</span>
                <span className="text-charcoal-400">Authentic wood-fire smoke</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {[
            { title: 'Our Philosophy', desc: 'Respect for tradition, daring in execution.' },
            { title: 'Our Ingredients', desc: '100% fresh, locally sourced produce & pure ghee.' },
            { title: 'Our Kitchen', desc: 'State-of-the-art tandoors and clay ovens.' },
            { title: 'Our People', desc: 'Passionate chefs with decades of heritage.' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-3xl bg-charcoal-900 border border-charcoal-800 space-y-2">
              <h3 className="font-serif text-lg font-bold text-saffron-400">{item.title}</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
