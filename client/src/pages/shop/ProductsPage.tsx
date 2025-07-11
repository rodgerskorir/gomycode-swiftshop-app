import { useState, useEffect, useContext } from "react";
import ProductCard from "../../components/shop/ProductCard";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import type { Product } from "../../types/Product";

const BASE_URL = import.meta.env.VITE_API_URL as string;

export default function ProductsPage() {
  const { user } = useContext(AuthContext);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState("Brand-All");
  const [category, setCategory] = useState("Category-All");
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();

        if (data.success) {
          const products: Product[] = data.data;

          setAllProducts(products);
          setFilteredProducts(products);

          const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
          const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

          setBrands(["Brand-All", ...uniqueBrands]);
          setCategories(["Category-All", ...uniqueCategories]);
        } else {
          console.error("API error:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = allProducts.filter(
      (p) =>
        (brand === "Brand-All" || p.brand === brand) &&
        (category === "Category-All" || p.category === category)
    );
    setFilteredProducts(filtered);
  }, [brand, category, allProducts]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
            {brands.map((b) => (
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
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Products */}
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
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
