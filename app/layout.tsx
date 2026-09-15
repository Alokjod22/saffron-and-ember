import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/navbar/Navbar';
import CartDrawer from '@/components/cart/CartDrawer';
import ToastNotification from '@/components/ui/ToastNotification';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Saffron & Ember | Modern Indian Restaurant',
  description:
    'Where Indian Flavours Meet the Fire. A modern Indian restaurant combining traditional Indian flavours with contemporary wood-fire culinary presentation.',
  keywords: ['Indian Restaurant', 'Modern Indian', 'Fine Dining', 'Tandoor', 'Saffron & Ember', 'Butter Chicken', 'Biryani'],
  openGraph: {
    title: 'Saffron & Ember | Modern Indian Restaurant',
    description: 'Where Indian Flavours Meet the Fire.',
    url: 'https://saffronandember.com',
    siteName: 'Saffron & Ember',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Saffron & Ember Restaurant',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="bg-charcoal-950 text-cream-100 font-sans antialiased min-h-screen flex flex-col selection:bg-saffron-500 selection:text-charcoal-950">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <ToastNotification />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
