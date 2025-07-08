import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import LoggedInNavbar from "../components/navbar/LoggedInNavbar";
import Footer from "../components/footer/Footer";
import { useAuth } from "../context/AuthContext";

const slides = [
  {
    image: "/assets/images/shoe-blue1.png",
    color: "from-blue-600 to-blue-900",
  },
  {
    image: "/assets/images/shoe-red2.png",
    color: "from-red-600 to-red-900",
  },
  {
    image: "/assets/images/shoe-green1.png",
    color: "from-green-600 to-green-900",
  },
  {
    image: "/assets/images/shoe-yellow4.png",
    color: "from-purple-600 via-blue-700 to-rose-500",
  },
];

export default function WelcomePage() {
  const [index, setIndex] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current.image}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${current.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        />
      </AnimatePresence>

      <div
        className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-60 z-10 transition-all duration-1000`}
      ></div>

      <div className="relative z-20 flex flex-col min-h-screen">
        {user ? <LoggedInNavbar /> : <Navbar />}

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
          <motion.div
            className="bg-black/10 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl text-white w-full max-w-xl sm:max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                SwiftShop
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 mt-4">
              Step into style. Discover the latest in footwear fashion and shop
              with confidence.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Link
                to="/products"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-black hover:bg-blue-600 text-white text-base sm:text-lg font-semibold shadow-md transition border border-white"
              >
                Start Shopping Now!
              </Link>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
