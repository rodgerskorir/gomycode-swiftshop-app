import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";
import type { Product } from "../../types/Product";
import { toast } from "react-toastify";
import { getProductImage } from "../../utils/getProductImage";

const allBrands = ["Brand-All", "Nike", "Adidas", "Puma"];
const allCategories = ["Category-All", "Sneakers", "Running", "Casual"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState("Brand-All");
  const [category, setCategory] = useState("Category-All");
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
      .catch((err) => {
        console.error("Failed to fetch products", err);
        toast.error("Failed to fetch products");
      });
  }, []);

  const filtered = products.filter(
    (p) =>
      (brand === "Brand-All" || p.brand === brand) &&
      (category === "Category-All" || p.category === category)
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/swiftshop/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Products
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Filter products by brand or category
          </p>

          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            {allBrands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            {allCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Brand</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p._id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-white"
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
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">Ksh {p.price.toLocaleString()}</td>
                  <td className="p-3">{p.numberOfStock}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => navigate(`/admin/products/${p._id}`)}
                      className="inline-flex items-center justify-center p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setEditProduct(p)}
                      className="inline-flex items-center justify-center p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="inline-flex items-center justify-center p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
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
      </main>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSave={(product: Product) => {
            setProducts((prev) => [...prev, product]);
            setShowModal(false);
            toast.success("Product added successfully");
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
