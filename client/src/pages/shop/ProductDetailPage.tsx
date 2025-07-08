import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/cart/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Footer from "../../components/footer/Footer";

import { productData } from "../../data/products";
import SimilarProductCard from "../../components/shop/SimilarProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productData.find((p) => p.id === Number(id));
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // 👈 Add this line

  const [selectedSize, setSelectedSize] = useState("");
  const [showCartButton, setShowCartButton] = useState(false);

  // 👇 Show toast for guests
  useEffect(() => {
    if (!user) {
      toast.info("Log in to save your cart or check out faster!", {
        toastId: "login-to-save", // prevents duplicates
      });
    }
  }, [user]);

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: discountedPrice,
      image: product.image,
      selectedSize,
      sizes: product.sizes,
    });

    toast.success(`${product.name} added to cart`);
    setShowCartButton(true);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (conditional) */}
      <div className="relative">
        {user ? <LoggedInNavbar /> : <Navbar />}
        <div className="absolute top-4 right-6">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-black" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Section */}
      <main className="bg-gray-50 max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          {product.image.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.name}
              className="w-full rounded-lg"
            />
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-500">
            {product.brand} • {product.category}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-black font-bold">
              Ksh {discountedPrice.toFixed(0)}
            </span>
            {product.discount && (
              <span className="line-through text-red-500 text-lg">
                Ksh {product.price}
              </span>
            )}
          </div>

          {/* Size */}
          <div>
            <label className="font-medium">Size:</label>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>

          {/*  View Cart Button */}
          {showCartButton && (
            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 bg-white border border-black text-black py-2 rounded-md hover:bg-gray-100 transition"
            >
              View Your Cart
            </button>
          )}
        </div>
      </main>

      {/* Similar Products */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productData
            .filter(
              (p) =>
                (p.category === product.category || p.brand === product.brand) &&
                p.id !== product.id
            )
            .slice(0, 4)
            .map((similar) => (
              <SimilarProductCard key={similar.id} product={similar} />
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
