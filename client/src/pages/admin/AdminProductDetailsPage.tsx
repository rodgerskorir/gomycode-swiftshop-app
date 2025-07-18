import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import EditProductModal from "../../components/admin/EditProductModal";
import { toast } from "react-toastify";
import type { Product } from "../../types/Product";
import { getProductImage } from "../../utils/getProductImage";
import { Edit, Trash2, ArrowLeft } from "lucide-react";

export default function AdminProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/swiftshop/products/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Failed to fetch product");
        setProduct(data.data);
      } catch (err: any) {
        toast.error(err.message || "Could not load product details.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!product || !window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/swiftshop/products/${product._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Product deleted successfully");
        navigate("/admin/products");
      } else {
        toast.error("Failed to delete product");
      }
    } catch {
      toast.error("Error deleting product");
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <AdminSidebar />
        <main className="p-6 text-gray-700 dark:text-white">Loading product details...</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            to="/admin/products"
            className="inline-flex items-center text-sm text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Products
          </Link>
        </div>

        {/* Header + Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Product Details</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white text-sm"
            >
              <Edit size={16} className="mr-1" /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm"
            >
              <Trash2 size={16} className="mr-1" /> Delete
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <img
              src={getProductImage(product.image)}
              alt={product.name}
              className="w-full max-w-xs h-40 object-cover rounded border"
              onError={(e) => {
                e.currentTarget.src = "/assets/images/default.png";
              }}
            />
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> Ksh {product.price.toLocaleString()}</p>
              <p><strong>Stock:</strong> {product.numberOfStock}</p>
              <p><strong>Description:</strong> {product.description}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Additional Info</h3>
            <p><strong>ID:</strong> {product._id}</p>
            <p><strong>Created At:</strong> {new Date(product.createdAt || "").toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(product.updatedAt || "").toLocaleString()}</p>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <EditProductModal
            product={product}
            onClose={() => setShowEditModal(false)}
            onUpdate={(updated: Product) => {
              setProduct(updated);
              setShowEditModal(false);
              toast.success("Product updated successfully");
            }}
          />
        )}
      </main>
    </div>
  );
}
