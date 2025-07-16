import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import EditProductModal from "../../components/admin/EditProductModal";
import { toast } from "react-toastify";
import type { Product } from "../../types/Product";
import { getProductImage } from "../../utils/getProductImage";
import { Edit, Trash2 } from "lucide-react";

export default function AdminProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/swiftshop/products/${id}`
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct(data.data);
      } catch (err: any) {
        toast.error(err.message || "Could not load product details.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (
      !product ||
      !window.confirm("Are you sure you want to delete this product?")
    )
      return;

    try {
      const res = await fetch(
        `http://localhost:5000/swiftshop/products/${product._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Product deleted successfully");
        navigate("/admin/products");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("Error deleting product");
    }
  };

  if (!product) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="p-6 text-gray-700 dark:text-white">
          Loading product details...
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Product Details</h1>
          <div className="space-x-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white text-sm"
            >
              <Edit size={16} className="mr-1" /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm"
            >
              <Trash2 size={16} className="mr-1" /> Delete
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex gap-6 mb-6">
            <img
              src={getProductImage(product.image)}
              alt={product.name}
              className="w-40 h-40 object-cover rounded border"
              onError={(e) => {
                e.currentTarget.src = "/assets/images/default.png";
              }}
            />
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Price:</strong> Ksh {product.price.toLocaleString()}
              </p>
              <p>
                <strong>Stock:</strong> {product.numberOfStock}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Additional Info</h3>
            <p>
              <strong>ID:</strong> {product._id}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {product.createdAt
                ? new Date(product.createdAt).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {product.updatedAt
                ? new Date(product.updatedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

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
