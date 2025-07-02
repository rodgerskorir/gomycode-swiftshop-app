
import type { Product } from "../types/Product";

export const productData : Product[] = [
  {
    id: 1,
    name: "Air Max 2024",
    brand: "Nike",
    category: "Sneakers",
    price: 3500,
    image: ["/assets/images/shoe-blue.png"],
    discount: 20,
    sizes: ["38", "39", "40", "41", "42"],
    colors: [
      "#000000", // Black
      "#FFFFFF", // White
      "#FF0000", // Red
      "#1E3A8A", // Navy Blue
      "#808080", // Grey
      "#2ECC71", // Green
      "#FACC15", // Yellow
      "#FB923C", // Orange
    ],
  },
  {
    id: 2,
    name: "Ultraboost",
    brand: "Adidas",
    category: "Running",
    price: 2300,
    image: ["/assets/images/shoe-red2.png"],
    discount: 15,
    sizes: ["38", "39", "40", "41", "42"],
    colors: [
      "#000000", // Black
      "#FFFFFF", // White
      "#FF0000", // Red
      "#1E3A8A", // Navy Blue
      "#808080", // Grey
      "#2ECC71", // Green
      "#FACC15", // Yellow
      "#FB923C", // Orange
    ],
  },
  {
    id: 3,
    name: "Court Vision",
    brand: "Nike",
    category: "Casual",
    price: 3000,
    image: ["/assets/images/shoe-green1.png"],
    sizes: ["38", "39", "40", "41", "42"],
    colors: [
      "#000000", // Black
      "#FFFFFF", // White
      "#FF0000", // Red
      "#1E3A8A", // Navy Blue
      "#808080", // Grey
      "#2ECC71", // Green
      "#FACC15", // Yellow
      "#FB923C", // Orange
    ],
  },
  {
    id: 4,
    name: "RS-X",
    brand: "Puma",
    category: "Sneakers",
    price: 4500,
    image: ["/assets/images/shoe-yellow4.png"],
    discount: 10,
    sizes: ["38", "39", "40", "41", "42"],
    colors: [
      "#000000", // Black
      "#FFFFFF", // White
      "#FF0000", // Red
      "#1E3A8A", // Navy Blue
      "#808080", // Grey
      "#2ECC71", // Green
      "#FACC15", // Yellow
      "#FB923C", // Orange
    ],
  },
];
