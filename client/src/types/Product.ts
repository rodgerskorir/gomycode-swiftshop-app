export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string[];
  discount?: number;
  sizes: string[];
  colors: string[];
   selectedSize?: string;
  selectedColor?: string;
}

export interface CartItem extends Product {
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}
