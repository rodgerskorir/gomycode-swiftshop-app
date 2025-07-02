// src/pages/products/ProductDetailPage.tsx
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../components/cart/CartContext";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


import { productData } from "../../data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = productData.find((p) => p.id === Number(id));
  const { cart, addToCart } = useContext(CartContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
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
      selectedColor,
      sizes: product.sizes,   
  colors: product.colors,
    });

    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with Cart */}
      <div className="relative">
        <Navbar />
        <div className="absolute top-4 right-6">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-black" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <main className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          {product.image.map((img, i) => (
            <img key={i} src={img} alt={product.name} className="w-full rounded-lg" />
          ))}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-500">{product.brand} • {product.category}</p>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-blue-600">
              Ksh {discountedPrice.toFixed(0)}
            </span>
            {product.discount && (
              <span className="line-through text-gray-400 text-lg">
                Ksh {product.price}
              </span>
            )}
          </div>

          {/* Size Selection */}
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

          {/* Color Selection */}
          <div>
            <label className="font-medium">Color:</label>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
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
        </div>
      </main>

      {/* Similar Products */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productData
            .filter((p) => p.category === product.category && p.id !== product.id)
            .map((similar) => (
              <div key={similar.id} className="border rounded-lg p-3 text-sm">
                <img
                  src={similar.image[0]}
                  alt={similar.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-2 font-medium">{similar.name}</p>
                <p className="text-blue-500 font-bold">Ksh {similar.price}</p>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
