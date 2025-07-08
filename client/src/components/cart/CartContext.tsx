import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Product, CartItem } from "../../types/Product";

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

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (
    productId: number,
    newQuantity: number,
    selectedSize?: string
  ) => {
    if (newQuantity < 1) return removeFromCart(productId, selectedSize);

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
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
