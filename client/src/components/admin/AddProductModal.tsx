import { X } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";
import type { Product } from "../../types/Product";

interface AddProductModalProps {
  onClose: () => void;
  onSave: (product: Product) => void;
  onSuccess?: () => void;
}

export default function AddProductModal({
  onClose,
  onSave,
  onSuccess,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [sizes, setSizes] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [numberOfStock, setNumberOfStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("sizes", sizes);
      formData.append("numberOfStock", numberOfStock.toString());

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch("http://localhost:5000/swiftshop/products", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || !result.success)
        throw new Error(result.message || "Failed to save product.");

      toast.success("Product added successfully!");
      onSave(result.data); // ✅ Pass the new product to the parent
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6 relative my-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Brand
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select brand</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="New Balance">New Balance</option>
                <option value="Reebok">Reebok</option>
                <option value="Vans">Vans</option>
                <option value="Converse">Converse</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select category</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Running">Running</option>
                <option value="Casual">Casual</option>
                <option value="Slides">Slides</option>
                <option value="Formal">Formal</option>
                <option value="Boots">Boots</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Price (Ksh)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Stock Quantity
            </label>
            <input
              type="number"
              value={numberOfStock}
              onChange={(e) => setNumberOfStock(Number(e.target.value))}
              className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Sizes
            </label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              placeholder="e.g. 40, 41, 42"
              className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="images/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
