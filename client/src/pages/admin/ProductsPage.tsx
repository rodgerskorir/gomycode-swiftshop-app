import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const allBrands = ["All", "Nike", "Adidas", "Puma"];
const allCategories = ["All", "Sneakers", "Running", "Casual"];

const sampleProducts = [
  {
    id: 1,
    name: "Air Max",
    brand: "Nike",
    category: "Sneakers",
    price: 12000,
    stock: 10,
    image: "/assets/products/air-max.png",
  },
  {
    id: 2,
    name: "Ultraboost",
    brand: "Adidas",
    category: "Running",
    price: 14000,
    stock: 5,
    image: "/assets/products/ultraboost.png",
  },
  {
    id: 3,
    name: "Suede Classic",
    brand: "Puma",
    category: "Casual",
    price: 9500,
    stock: 8,
    image: "/assets/products/suede.png",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const filtered = sampleProducts.filter(
      (p) =>
        (brand === "All" || p.brand === brand) &&
        (category === "All" || p.category === category)
    );
    setProducts(filtered);
  }, [brand, category]);

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Products
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            {allBrands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            {allCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
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
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">Ksh {p.price.toLocaleString()}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 space-x-2">
                    <button className="inline-flex items-center justify-center p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white">
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
    </div>
  );
}
