'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquarePlus, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Testimonials() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const { setToastMessage } = useCart();

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) setReviews(data.reviews);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment }),
      });

      if (res.ok) {
        setToastMessage('Review submitted successfully! Thank you ⭐');
        setModalOpen(false);
        setComment('');
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="py-24 bg-charcoal-900 border-t border-b border-charcoal-800/80 text-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono text-saffron-400 uppercase tracking-widest">
              Guest Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mt-1">
              Loved By Food Enthusiasts
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 md:mt-0 px-6 py-3 rounded-full bg-saffron-500/10 border border-saffron-500/40 text-saffron-400 hover:bg-saffron-500 hover:text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" /> Leave A Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 6).map((rev, idx) => (
            <motion.div
              key={rev.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-charcoal-950 border border-charcoal-800 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-saffron-400">
                  {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-saffron-400" />
                  ))}
                </div>
                <p className="text-sm text-charcoal-200 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-charcoal-800/60 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-cream-100">{rev.userName}</h4>
                  <p className="text-[10px] text-saffron-400 font-mono">Verified Guest</p>
                </div>
                {rev.menuItem && (
                  <span className="text-[11px] text-charcoal-400 bg-charcoal-900 px-3 py-1 rounded-full border border-charcoal-800">
                    {rev.menuItem.name}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-2xl relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-charcoal-400 hover:text-cream-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-xl font-bold mb-4">Share Your Dining Experience</h3>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-charcoal-400 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-2"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-saffron-400 fill-saffron-400'
                              : 'text-charcoal-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-charcoal-400 mb-2">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you loved about the food, ambience, or service..."
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 text-xs focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-saffron-500/20"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
