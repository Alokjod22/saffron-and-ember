'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function ToastNotification() {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-charcoal-900 border border-saffron-500/40 text-cream-100 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium tracking-wide">{toastMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
