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
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filtering
  useEffect(() => {
    const filtered = allProducts.filter(
      (p) =>
        (brand === "Brand-All" || p.brand === brand) &&
        (category === "Category-All" || p.category === category) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on any filter change
  }, [brand, category, searchTerm, allProducts]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {user ? <LoggedInNavbar /> : <Navbar />}

      <main className="flex-1 px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Shop Sneakers
        </h1>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-6 text-sm">
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

          <input
            type="text"
            placeholder="Search by name... Nike, Air, Retro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white w-full sm:w-64"
          />

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={30}>Show 30</option>
          </select>
        </div>

        {/* Products */}
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
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
                  setSearchTerm("");
                }}
                className="mt-4 px-4 py-2 bg-black hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
