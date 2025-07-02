import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import { CartContext } from "../cart/CartContext";


export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { cartCount } = useContext(CartContext);

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-black">
            SwiftShop
          </Link>
          <nav className="flex gap-6 items-center font-medium">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-500">
              Shop
            </Link>
            <Link to="/about" className="hover:text-blue-500">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-500">
              Contact
            </Link>
            <button
              onClick={() => setShowLogin(true)}
              className="hover:text-blue-500"
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="hover:text-blue-500"
            >
              Sign Up
            </button>
            <Link to="/cart" className="relative hover:text-blue-500">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center bg-yellow-400">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitch={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}