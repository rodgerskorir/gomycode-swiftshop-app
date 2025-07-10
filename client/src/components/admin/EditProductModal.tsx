import { useState, type FormEvent, type ChangeEvent } from "react";
import { X } from "lucide-react";
import type { Product } from "../../types/Product";
import { toast } from "react-toastify";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void;
}

export default function EditProductModal({
  product,
  onClose,
  onUpdate,
}: EditProductModalProps) {
  const [form, setForm] = useState<Product>(product);
  const [preview, setPreview] = useState<string>(product.image[0]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "numberOfStock" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("brand", form.brand);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("price", form.price.toString());
      formData.append("numberOfStock", form.numberOfStock.toString());
      formData.append("sizes", form.sizes.join(","));

      if (file) {
        formData.append("images", file);
      }

      const res = await fetch(
        `http://localhost:5000/swiftshop/products/${form._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update product");
      }

    
      onUpdate(data.data);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
            className="w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            name="numberOfStock"
            type="number"
            value={form.numberOfStock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            required
            className="w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 h-28 object-cover rounded border dark:border-gray-700"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
