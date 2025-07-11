import { useState } from "react";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import type { FullUser } from "../../types/User";

interface Props {
  user: FullUser;
  onClose: () => void;
  onUpdate: (updated: FullUser) => void;
}

export default function EditProfileModal({ user, onClose, onUpdate }: Props) {
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let avatarUrl = user.avatar;

      // Upload avatar if selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const uploadRes = await fetch(`${API}/users/upload`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.message || "Upload failed");
        }

        avatarUrl = uploadData.url;
      }

      // Update user data
      const res = await fetch(`${API}/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, avatar: avatarUrl }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Update failed");
      }

      toast.success("Profile updated!");
      onUpdate(result.data);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Shipping address"
            className="w-full p-2 border rounded"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Upload New Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {avatarFile && (
              <p className="text-xs text-gray-500">Selected: {avatarFile.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-blue-700 text-white rounded-md py-2"
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
