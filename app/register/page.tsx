'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Flame, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register');

      login(data.user, data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-charcoal-950 text-cream-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center mx-auto">
            <Flame className="w-6 h-6 fill-saffron-400" />
          </div>
          <h1 className="font-serif text-2xl font-bold">Create Account</h1>
          <p className="text-xs text-charcoal-400">Join Saffron & Ember Club for exclusive dining perks</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block text-charcoal-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Ananya Malhotra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:border-saffron-500"
            />
          </div>

          <div>
            <label className="block text-charcoal-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="ananya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:border-saffron-500"
            />
          </div>

          <div>
            <label className="block text-charcoal-400 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:border-saffron-500"
            />
          </div>

          <div>
            <label className="block text-charcoal-400 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:border-saffron-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-charcoal-950 font-bold uppercase tracking-wider text-xs shadow-lg shadow-saffron-500/20 hover:scale-[1.02] transition-transform"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center text-xs text-charcoal-400">
          Already have an account?{' '}
          <Link href="/login" className="text-saffron-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
