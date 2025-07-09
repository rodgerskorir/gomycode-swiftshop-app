import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { productData } from "../../data/products";
import type { Product } from "../../types/Product";
import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";

const allBrands = ["Brand-All", "Nike", "Adidas", "Puma"];
const allCategories = ["Category-All", "Sneakers", "Running", "Casual"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(productData);
  const [brand, setBrand] = useState("Brand-All");
  const [category, setCategory] = useState("Category-All");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const filtered = productData.filter(
      (p) =>
        (brand === "Brand-All" || p.brand === brand) &&
        (category === "Category-All" || p.category === category)
    );
    setProducts(filtered);
  }, [brand, category]);

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    setShowModal(false);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditProduct(null);
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

        {/* Filters */}
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

        {/* Product Table */}
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
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-white"
                >
                  <td className="p-3">
                    <img
                      src={p.image[0]}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">Ksh {p.price.toLocaleString()}</td>
                  <td className="p-3">{p.sizes.length * 5}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => setEditProduct(p)}
                      className="inline-flex items-center justify-center p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex items-center justify-center p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
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

      {/* Add Product Modal */}
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSave={handleAddProduct}
        />
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
}
