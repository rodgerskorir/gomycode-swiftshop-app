export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string[];
  discount?: number;
  sizes: string[];
  selectedSize?: string;
}

export interface CartItem extends Product {
  selectedSize?: string;
  quantity: number;
}
