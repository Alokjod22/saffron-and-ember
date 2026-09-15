'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800/80 text-cream-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-charcoal-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-saffron-600 to-saffron-400 flex items-center justify-center text-charcoal-950 font-bold shadow-lg">
                <Flame className="w-5 h-5 fill-charcoal-950" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Saffron <span className="text-saffron-400 font-sans font-light">&</span> Ember
              </span>
            </Link>

            <p className="text-xs text-charcoal-400 max-w-sm leading-relaxed">
              "Where Indian Flavours Meet the Fire." Modern Indian cuisine combining traditional spices with contemporary culinary artistry.
            </p>

            <div className="flex gap-3 pt-2">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: '#' },
                { icon: <Facebook className="w-4 h-4" />, href: '#' },
                { icon: <Twitter className="w-4 h-4" />, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-charcoal-900 border border-charcoal-800 text-charcoal-400 hover:text-saffron-400 hover:border-saffron-500/50 flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-saffron-400 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-xs text-charcoal-300">
              <li><Link href="/" className="hover:text-cream-100">Home</Link></li>
              <li><Link href="/menu" className="hover:text-cream-100">Full Menu</Link></li>
              <li><Link href="/experience" className="hover:text-cream-100">The Experience</Link></li>
              <li><Link href="/reservations" className="hover:text-cream-100">Table Reservations</Link></li>
              <li><Link href="/about" className="hover:text-cream-100">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-cream-100">Contact & Hours</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-saffron-400 uppercase tracking-widest">Visit Us</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-saffron-400 shrink-0 mt-0.5" />
                <span>21 Culinary Lane, Mumbai, Maharashtra 400018</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron-400 shrink-0" />
                <span>+91 90000 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-saffron-400 shrink-0" />
                <span>hello@saffronandember.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-saffron-400 uppercase tracking-widest">Opening Hours</h4>
            <div className="space-y-2 text-xs text-charcoal-300">
              <div>
                <p className="font-semibold text-cream-100">Monday – Thursday</p>
                <p className="text-charcoal-400">11:30 AM – 11:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-cream-100">Friday – Sunday</p>
                <p className="text-charcoal-400">11:30 AM – 11:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} Saffron & Ember Restaurant. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-charcoal-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-charcoal-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
