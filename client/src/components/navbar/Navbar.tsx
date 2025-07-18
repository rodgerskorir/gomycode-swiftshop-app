import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import { CartContext } from "../cart/CartContext";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext);

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-black">
            SwiftShop
          </Link>

          {/* Mobile toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 items-center font-medium">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-500">
              Shop
            </Link>
            <Link to="/cart" className="relative hover:text-blue-500">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
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
            
          </nav>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 font-medium">
            <Link
              to="/"
              className="block hover:text-blue-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block hover:text-blue-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="bg-yellow-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span>Cart</span>
            </Link>
            <Link
              to="/about"
              className="block hover:text-blue-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block hover:text-blue-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                setShowLogin(true);
                setMobileMenuOpen(false);
              }}
              className="block hover:text-blue-500"
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowRegister(true);
                setMobileMenuOpen(false);
              }}
              className="block hover:text-blue-500"
            >
              Sign Up
            </button>
          </div>
        )}
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
