import { createContext, useState, type ReactNode } from "react";
import type { Product, CartItem } from "../../types/Product";

// Define context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number, selectedSize?: string) => void;
  updateQuantity: (
    productId: number,
    newQuantity: number,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  cartCount: number;
}

// Initial placeholder context
export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
});

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add to cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (
    productId: number,
    selectedSize?: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (
    productId: number,
    newQuantity: number,
    selectedSize?: string
  ) => {
    if (newQuantity < 1) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Total item count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
