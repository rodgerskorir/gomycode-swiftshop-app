import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/assets/images/shoe-blue.png",
    color: "from-blue-600 to-blue-900",
  },
  {
    image: "/assets/images/shoe-red.png",
    color: "from-red-600 to-red-900",
  },
  {
    image: "/assets/images/shoe-green.png",
    color: "from-green-600 to-green-900",
  },
//   {
//     image: "/assets/images/shoe-yellow.png",
//     color: "from-yellow-400 to-yellow-600",
//   },
];

export default function WelcomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <AnimatePresence>
        <motion.div
          key={current.image}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${current.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-60 z-10 transition-all duration-1000`}
      ></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-black/50 text-white">
          <h1 className="text-2xl font-bold text-white">SwiftShop</h1>
          <ul className="flex gap-6 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-300 transition">Shop</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-300 transition">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            className="bg-black/10 backdrop-blur-md p-10 rounded-2xl shadow-xl text-white w-full max-w-4xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-extrabold">
              Welcome to <span className="text-blue-300">SwiftShop</span>
            </h1>
            <p className="text-lg text-gray-200 mt-4">
              Step into style. Discover the latest in footwear fashion and shop with confidence.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl border border-white hover:bg-white hover:text-gray-900 transition font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
