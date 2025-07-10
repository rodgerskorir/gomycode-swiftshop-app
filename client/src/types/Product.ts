export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  image: string[];
  sizes: string[];
  inStock: boolean;
  numberOfStock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem extends Product {
  selectedSize?: string;
  quantity: number;
}
