'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Customizations {
  spiceLevel?: string;
  extras?: { name: string; price: number }[];
  note?: string;
}

export interface CartItem {
  id: string; // unique key in cart
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customizations?: Customizations;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: {
    menuItemId: string;
    name: string;
    price: number;
    image: string;
    quantity?: number;
    customizations?: Customizations;
  }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  discountAmount: number;
  subtotal: number;
  tax: number;
  total: number;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('saffron_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('saffron_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (newItem: {
    menuItemId: string;
    name: string;
    price: number;
    image: string;
    quantity?: number;
    customizations?: Customizations;
  }) => {
    const qty = newItem.quantity || 1;
    // Calculate total item price including extras
    let extraCost = 0;
    if (newItem.customizations?.extras) {
      extraCost = newItem.customizations.extras.reduce((sum, e) => sum + e.price, 0);
    }
    const finalPrice = newItem.price + extraCost;

    const cartItemId = `${newItem.menuItemId}-${newItem.customizations?.spiceLevel || 'default'}-${
      newItem.customizations?.extras?.map((e) => e.name).join(',') || 'none'
    }`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            menuItemId: newItem.menuItemId,
            name: newItem.name,
            price: finalPrice,
            image: newItem.image,
            quantity: qty,
            customizations: newItem.customizations,
          },
        ];
      }
    });

    showToast(`Added ${newItem.name} to cart ✓`);
    setIsOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Dish removed from cart');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountRate(0);
  };

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SAFFRON10') {
      setPromoCode('SAFFRON10');
      setDiscountRate(0.1); // 10% off
      showToast('Promo code SAFFRON10 applied! (10% OFF) 🎉');
      return true;
    } else {
      showToast('Invalid promo code');
      return false;
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const tax = (subtotal - discountAmount) * 0.05; // 5% GST/Tax
  const total = subtotal - discountAmount + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        applyPromoCode,
        discountAmount,
        subtotal,
        tax,
        total,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
