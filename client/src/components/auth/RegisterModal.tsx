// Import necessary dependencies from React, framer-motion, and react-router-dom
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Define the props expected by the RegisterModal component
interface Props {
  onClose: () => void;
  onSwitch: () => void;
}

// Define and export the RegisterModal component
export default function RegisterModal({ onClose, onSwitch }: Props) {
  // Define state variables for form fields and error message
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match"); // Display error if they don't match
      return;
    }

    setError(""); // Clear previous errors
    // Normally, you would send a POST request to the backend here
    console.log("Registering:", { name, email, phone, password });
  };

  return (
    // Modal backdrop with blur and dark overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        // Animate modal appearance using framer-motion
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative"
      >
        {/* Close button in top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        {/* Modal title */}
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Sign Up to SwiftShop
        </h2>

        {/* Error message display */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name input */}
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

          {/* Email input */}
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

          {/* Phone input */}
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

          {/* Password input */}
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

          {/* Confirm Password input */}
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

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-blue-600 transition text-white py-2 rounded-md font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Link to login page */}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-blue-500 hover:underline font-bold"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
}
