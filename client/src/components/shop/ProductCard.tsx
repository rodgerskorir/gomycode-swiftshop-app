// src/components/shop/ProductCard.tsx

import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Link
      to={`/products/${product.id}`}
      className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-200 overflow-hidden"
    >
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
          {product.discount}% OFF
        </span>
      )}

      {/* Product Image */}
      <img
        src={product.image[0] || "/assets/images/default.png"}
        alt={product.name}
        className="w-full h-48 object-cover object-center"
      />

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-sm text-gray-400">{product.category}</p>

        {/* Price Display */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-blue-600 font-semibold">
            Ksh {discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-gray-400 line-through">
              Ksh {product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* View Button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          View Item
        </button>
      </div>
    </Link>
  );
}
