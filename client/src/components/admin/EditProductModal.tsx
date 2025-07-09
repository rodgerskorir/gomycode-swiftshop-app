import { useState, type FormEvent, type ChangeEvent } from "react";
import { X } from "lucide-react";
import type { Product } from "../../types/Product";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void;
}

export default function EditProductModal({ product, onClose, onUpdate }: EditProductModalProps) {
  const [form, setForm] = useState<Product>(product);
  const [preview, setPreview] = useState<string>(product.image[0]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setForm((prev) => ({ ...prev, image: [objectUrl] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
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
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-28 object-cover rounded border dark:border-gray-700"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
