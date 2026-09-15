'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Search,
  Menu as MenuIcon,
  X,
  User as UserIcon,
  Sun,
  Moon,
  Flame,
  Calendar,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const pathname = usePathname();

  const { cart, openCart } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      fetch(`/api/menu?search=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items) setSearchResults(data.items.slice(0, 5));
        })
        .catch(() => {});
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Experience', href: '/experience' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-charcoal-950/85 dark:bg-charcoal-950/90 backdrop-blur-md border-b border-charcoal-800/50 py-3 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-saffron-600 to-saffron-400 flex items-center justify-center text-charcoal-950 font-bold shadow-lg shadow-saffron-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 fill-charcoal-950" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-cream-100 dark:text-cream-100">
                Saffron <span className="text-saffron-400 font-sans font-light">&</span> Ember
              </span>
              <p className="text-[10px] text-saffron-400/90 tracking-widest uppercase font-mono">Modern Indian</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    active
                      ? 'text-saffron-400'
                      : 'text-charcoal-300 hover:text-cream-100 dark:text-charcoal-300 dark:hover:text-cream-100'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron-400 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-charcoal-300 hover:text-saffron-400 hover:bg-charcoal-800/50 transition-colors"
              aria-label="Search Menu"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-charcoal-300 hover:text-saffron-400 hover:bg-charcoal-800/50 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="p-2 rounded-full text-charcoal-300 hover:text-saffron-400 hover:bg-charcoal-800/50 transition-colors relative"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-saffron-500 text-charcoal-950 font-bold text-xs flex items-center justify-center shadow-md animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Auth or Admin badge */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 rounded-full border border-charcoal-700 bg-charcoal-900/60 hover:border-saffron-500/50 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-charcoal-900 border border-charcoal-800 rounded-xl shadow-2xl py-2 hidden group-hover:block z-50">
                  <div className="px-4 py-2 border-b border-charcoal-800">
                    <p className="text-xs font-semibold text-cream-100 truncate">{user.name}</p>
                    <p className="text-[10px] text-saffron-400 font-mono">{user.role}</p>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-charcoal-800"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-charcoal-300 hover:text-cream-100 px-3 py-1.5 rounded-full border border-charcoal-700 hover:border-charcoal-500 transition-colors"
              >
                <UserIcon className="w-4 h-4" /> Login
              </Link>
            )}

            {/* Reserve Table CTA */}
            <Link
              href="/reservations"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-semibold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-saffron-500/20 hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4" /> Reserve Table
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-charcoal-200 hover:text-saffron-400 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[60px] left-0 right-0 bg-charcoal-950/95 border-b border-charcoal-800/80 backdrop-blur-xl z-30 px-6 py-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 border-b border-charcoal-900 ${
                    pathname === link.href ? 'text-saffron-400 font-semibold' : 'text-charcoal-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/reservations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold uppercase tracking-wider text-sm shadow-lg shadow-saffron-500/20"
                >
                  Reserve a Table
                </Link>

                {!user && (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-xl border border-charcoal-700 text-cream-100 font-medium text-sm"
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4"
          >
            <div className="w-full max-w-2xl bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-5 right-5 text-charcoal-400 hover:text-cream-100"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="font-serif text-xl font-bold text-cream-100 mb-4">Search Culinary Creations</h3>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-charcoal-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dishes, ingredients, paneer, biryani..."
                  className="w-full pl-12 pr-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-2xl text-cream-100 focus:outline-none focus:border-saffron-500 text-sm"
                />
              </div>

              {/* Suggestions */}
              {searchResults.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {searchResults.map((dish) => (
                    <Link
                      key={dish.id}
                      href={`/menu?search=${encodeURIComponent(dish.name)}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-charcoal-800 transition-colors"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-cream-100">{dish.name}</h4>
                        <p className="text-xs text-charcoal-400 truncate">{dish.description}</p>
                      </div>
                      <span className="text-saffron-400 font-bold text-sm">₹{dish.price}</span>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.length > 1 ? (
                <p className="text-sm text-charcoal-400 text-center py-6">No dishes found matching "{searchQuery}"</p>
              ) : (
                <div className="text-xs text-charcoal-400">
                  <p className="mb-2 font-semibold">Popular Searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Paneer', 'Butter Chicken', 'Biryani', 'Garlic Naan', 'Gulab Jamun'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1 bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 rounded-full transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
