export interface CartItem {
  id: string; // Required for lookup in cart
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string[]; 
  sizes: string[];
  selectedSize: string;
  quantity: number;
}
