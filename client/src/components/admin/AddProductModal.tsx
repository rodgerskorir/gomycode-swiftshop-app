import { X } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Product } from "../../types/Product";

interface AddProductModalProps {
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function AddProductModal({ onClose, onSave }: AddProductModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [sizes, setSizes] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Dummy local image URLs (in real use case, upload to backend or cloud)
    const imagePreviews = imageFiles.map(file => URL.createObjectURL(file));

    const newProduct: Product = {
      id: Date.now(), // temporary ID
      name,
      brand,
      category,
      price,
      sizes: sizes.split(",").map(s => s.trim()), // e.g. "40, 41, 42"
      image: imagePreviews,
    };

    onSave(newProduct);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600">
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />

          <input
            type="text"
            placeholder="Brand (e.g. Nike)"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />

          <input
            type="text"
            placeholder="Category (e.g. Sneakers)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />

          <input
            type="text"
            placeholder="Sizes (comma-separated, e.g. 40, 41, 42)"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-700 dark:text-gray-200 bg-gray-800 py-5 px-4"
            />
            {imageFiles.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {imageFiles.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
