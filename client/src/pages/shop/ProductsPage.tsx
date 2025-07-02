import { useState, useEffect } from "react";
import ProductCard from "../../components/shop/ProductCard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { ShoppingCart } from "lucide-react";

const sampleProducts = [
  {
    id: 1,
    name: "Air Max 2024",
    brand: "Nike",
    category: "Sneakers",
    price: 3500,
    image: "/assets/images/shoe-blue.png",
    discount: 20,
    
  },
  {
    id: 2,
    name: "Ultraboost",
    brand: "Adidas",
    category: "Running",
    price: 2300,
    image: "/assets/images/shoe-red2.png",
    discount: 15,
  },
  {
    id: 3,
    name: "Court Vision",
    brand: "Nike",
    category: "Casual",
    price: 3000,
    image: "/assets/images/shoe-green1.png",
  },
  {
    id: 4,
    name: "RS-X",
    brand: "Puma",
    category: "Sneakers",
    price: 4500,
    image: "/assets/images/shoe-yellow4.png",
    discount: 10,
  },
];

const allBrands = ["All", "Nike", "Adidas", "Puma"];
const allCategories = ["All", "Sneakers", "Running", "Casual"];

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const filtered = sampleProducts.filter(
      (p) => (brand === "All" || p.brand === brand) && (category === "All" || p.category === category)
    );
    setProducts(filtered);
  }, [brand, category]);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <Navbar />
        <div className="absolute top-4 right-6">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Shop Sneakers</h1>

        <div className="flex justify-center gap-4 mb-8">
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="px-4 py-2 border rounded-md">
            {allBrands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 border rounded-md">
            {allCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p>No products match your filters.</p>
            <button onClick={() => { setBrand("All"); setCategory("All"); }} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
