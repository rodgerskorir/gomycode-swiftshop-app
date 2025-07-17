import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface Props {
  onClose: () => void;
  onSwitch: () => void;
}

export default function RegisterModal({ onClose, onSwitch }: Props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!phoneRegex.test(phone)) {
      return "Phone number must be between 10 to 15 digits.";
    }

    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/swiftshop/users", {
        name,
        username,
        email,
        phone,
        password,
      });

      if (response.data.success) {
        onClose(); // Or maybe show login modal?
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      const backendError = err.response?.data?.error?.toLowerCase() || "";

      if (backendError.includes("username")) {
        setError("Username is already taken.");
      } else if (backendError.includes("email")) {
        setError("An account with this email already exists.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-black">Sign Up to SwiftShop</h2>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-blue-600 transition text-white py-2 rounded-md font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-blue-500 hover:underline font-bold">
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
}
