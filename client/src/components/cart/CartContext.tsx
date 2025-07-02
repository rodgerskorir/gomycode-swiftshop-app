// src/components/cart/CartContext.tsx

import { createContext, useState, type ReactNode } from "react";
import type { Product, CartItem } from "../../types/Product";



// Context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (
    productId: number,
    selectedSize?: string,
    selectedColor?: string
  ) => void;
  updateQuantity: (
    productId: number,
    newQuantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => void;
  cartCount: number;
}

// Initial context (placeholder functions)
export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  cartCount: 0,
});

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add product to cart (with size/color variant)
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove product (specific variant)
  const removeFromCart = (
    productId: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  // Update quantity or remove if quantity is < 1
  const updateQuantity = (
    productId: number,
    newQuantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    if (newQuantity < 1) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Total count of items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Context provider
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
