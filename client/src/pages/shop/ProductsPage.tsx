import { useState, useEffect, useContext } from "react";
import ProductCard from "../../components/shop/ProductCard";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Footer from "../../components/footer/Footer";
import type { Product } from "../../types/Product";
import { productData } from "../../data/products";
import { AuthContext } from "../../context/AuthContext"; // 👈 Import AuthContext

const allBrands = [
  "Brand-All",
  ...Array.from(new Set(productData.map((p) => p.brand))),
];
const allCategories = [
  "Category-All",
  ...Array.from(new Set(productData.map((p) => p.category))),
];

export default function ProductsPage() {
  const { user } = useContext(AuthContext); // 👈 Get user from context

  const [products, setProducts] = useState<Product[]>(productData);
  const [brand, setBrand] = useState("Brand-All");
  const [category, setCategory] = useState("Category-All");

  useEffect(() => {
    const filtered = productData.filter(
      (p) =>
        (brand === "Brand-All" || p.brand === brand) &&
        (category === "Category-All" || p.category === category)
    );
    setProducts(filtered);
  }, [brand, category]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Conditional navbar */}
      {user ? <LoggedInNavbar /> : <Navbar />}

      <main className="flex-1 px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Shop Sneakers
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-10 text-sm">
          <p className="text-gray-500 text-center sm:text-left">
            Filter products by brand or category
          </p>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            {allBrands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={`${product.id}-${product.name}`}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="max-w-md mx-auto">
              <img
                src="/assets/images/empty-state.png"
                alt="No products found"
                className="w-40 h-40 mx-auto mb-4 object-contain"
              />
              <p className="text-lg text-gray-600 mb-2">
                No products match your filters
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your filters or browse our full collection
              </p>
              <button
                onClick={() => {
                  setBrand("Brand-All");
                  setCategory("Category-All");
                }}
                className="mt-4 px-4 py-2 bg-black hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
