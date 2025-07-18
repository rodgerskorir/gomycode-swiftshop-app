import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";
import type { Product } from "../../types/Product";
import { toast } from "react-toastify";
import { getProductImage } from "../../utils/getProductImage";

const allBrands = ["Brand-All", "Nike", "Adidas", "Puma"];
const allCategories = ["Category-All", "Sneakers", "Running", "Casual"];
const ITEMS_PER_PAGE = 10;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState("Brand-All");
  const [category, setCategory] = useState("Category-All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/swiftshop/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          toast.error("Failed to fetch products.");
        }
      })
      .catch(() => {
        toast.error("Failed to fetch products");
      });
  }, []);

  const filtered = products.filter(
    (p) =>
      (brand === "Brand-All" || p.brand === brand) &&
      (category === "Category-All" || p.category === category) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/swiftshop/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch {
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-64">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Products
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-center text-sm">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            {allBrands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            {allCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="pl-8 pr-3 py-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3 hidden sm:table-cell">Brand</th>
                <th className="text-left p-3 hidden sm:table-cell">Category</th>
                <th className="text-left p-3 hidden md:table-cell">Price</th>
                <th className="text-left p-3 hidden md:table-cell">Stock</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr
                  key={p._id}
                  onClick={() => navigate(`/admin/products/${p._id}`)}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white cursor-pointer"
                >
                  <td className="p-3">
                    <img
                      src={getProductImage(p.image)}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) =>
                        (e.currentTarget.src = "/assets/images/default.png")
                      }
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 hidden sm:table-cell">{p.brand}</td>
                  <td className="p-3 hidden sm:table-cell">{p.category}</td>
                  <td className="p-3 hidden md:table-cell">
                    Ksh {p.price.toLocaleString()}
                  </td>
                  <td className="p-3 hidden md:table-cell">{p.numberOfStock}</td>
                  <td
                    className="p-3 space-x-2 flex"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => navigate(`/admin/products/${p._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setEditProduct(p)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2 text-sm">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSave={(product: Product) => {
            setProducts((prev) => [...prev, product]);
            setShowModal(false);
          }}
        />
      )}

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdate={(updated: Product) => {
            setProducts((prev) =>
              prev.map((p) => (p._id === updated._id ? updated : p))
            );
            setEditProduct(null);
            toast.success("Product updated successfully");
          }}
        />
      )}
    </div>
  );
}
