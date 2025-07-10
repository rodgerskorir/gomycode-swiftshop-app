import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem } from "../../types/Product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (
    productId: string,
    newQuantity: number,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  cartCount: number;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("swiftshop-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("swiftshop-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p._id === item._id && p.selectedSize === item.selectedSize
      );

      if (existing) {
        return prev.map((p) =>
          p._id === item._id && p.selectedSize === item.selectedSize
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item._id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (
    productId: string,
    newQuantity: number,
    selectedSize?: string
  ) => {
    if (newQuantity < 1) return removeFromCart(productId, selectedSize);

    setCart((prev) =>
      prev.map((item) =>
        item._id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("swiftshop-cart");
  };

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
