import { Link } from "react-router-dom";
import { useContext } from "react";
import type { Product } from "../../types/Product";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../cart/CartContext";

interface ProductCardProps {
  product: Product;
}

const BASE_URL = import.meta.env.VITE_API_URL as string;

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useContext(CartContext);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      ...product,
      selectedSize: product.sizes?.[0] || "Default",
      quantity: 1,
    });
  };

  // Safe image handling
  const getImagePath = () => {
    if (typeof product.image === "string") return product.image;
    if (Array.isArray(product.image) && product.image.length > 0) {
      const img = product.image[0];
      return img.startsWith("http")
        ? img
        : `${BASE_URL}/${img.replace(/^\/+/, "")}`;
    }
    return "/assets/images/default.png";
  };

  const imagePath = getImagePath();

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-200 overflow-hidden">
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
          {product.discount}% OFF
        </span>
      )}

      <Link to={`/products/${product._id}`}>
        <img
          src={imagePath}
          alt={product.name}
          className="w-full h-48 object-cover object-center"
          onError={(e) => (e.currentTarget.src = "/assets/images/default.png")}
        />
      </Link>

      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-sm text-gray-400">{product.category}</p>
        {/* description */}
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-black font-bold">
            Ksh {discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-red-500 line-through">
              Ksh {product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-between items-center gap-2">
          <Link
            to={`/products/${product._id}`}
            className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition text-sm text-center"
          >
            View Item
          </Link>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded bg-yellow-500 text-white hover:bg-blue-600 transition"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
