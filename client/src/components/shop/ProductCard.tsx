import { Link } from "react-router-dom";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  discount?: number;
  isHot?: boolean;
}

interface Props {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const [hovered, setHovered] = useState(false);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 flex gap-2 z-10">
        {product.isHot && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">HOT</span>
        )}
        {product.discount && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Image */}
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />

      {/* Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <p className="text-sm text-gray-400 mb-2">{product.category}</p>

        {/* Price */}
        <div className="flex justify-end items-center gap-2">
          <span className="text-blue-600 font-bold">
            Ksh {discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-gray-400 text-sm line-through">
              Ksh {product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        {hovered && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        )}
      </div>
    </Link>
  );
}
