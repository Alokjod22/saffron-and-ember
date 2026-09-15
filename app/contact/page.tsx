'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { setToastMessage } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (res.ok) {
        setSubmitted(true);
        setToastMessage('Message sent successfully! We will get back to you shortly.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-cream-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-saffron-400 uppercase tracking-widest">Connect With Us</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">Contact Saffron & Ember</h1>
          <p className="text-sm text-charcoal-400">
            Have a question about our menu, private events, or reservations? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-saffron-400 mx-auto" />
                <h3 className="font-serif text-2xl font-bold">Thank You!</h3>
                <p className="text-xs text-charcoal-400">We have received your message and will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-charcoal-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ananya Malhotra"
                      className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:border-saffron-500"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 90000 12345"
                      className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:border-saffron-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-charcoal-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-charcoal-400 mb-1">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you?"
                    className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-saffron-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-charcoal-900 border border-charcoal-800 space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-saffron-400">Restaurant Information</h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-saffron-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Address</p>
                  <p className="text-charcoal-400">Saffron & Ember, 21 Culinary Lane, Mumbai, Maharashtra 400018</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-saffron-400 shrink-0" />
                <div>
                  <p className="font-semibold text-cream-100">Phone</p>
                  <p className="text-charcoal-400">+91 90000 12345</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-saffron-400 shrink-0" />
                <div>
                  <p className="font-semibold text-cream-100">Email</p>
                  <p className="text-charcoal-400">hello@saffronandember.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-saffron-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Hours</p>
                  <p className="text-charcoal-400">Mon-Thu: 11:30 AM – 11:00 PM</p>
                  <p className="text-charcoal-400">Fri-Sun: 11:30 AM – 11:30 PM</p>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="h-64 rounded-3xl overflow-hidden border border-charcoal-800 bg-charcoal-900 relative flex items-center justify-center text-center p-6">
              <div className="space-y-2">
                <MapPin className="w-8 h-8 text-saffron-400 mx-auto animate-bounce" />
                <p className="font-serif text-sm font-bold">21 Culinary Lane, Mumbai</p>
                <p className="text-[10px] text-charcoal-400">Interactive Map Location Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
