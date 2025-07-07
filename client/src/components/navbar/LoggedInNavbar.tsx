import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { CartContext } from "../cart/CartContext";

export default function LoggedInNavbar() {
  const { cartCount } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-black">
          SwiftShop
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-black"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex gap-6 items-center font-medium">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/products" className="hover:text-blue-500">Shop</Link>
          <Link to="/my-orders" className="hover:text-blue-500">My Orders</Link>
          <Link to="/profile" className="hover:text-blue-500">Profile</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>

          <Link to="/cart" className="relative hover:text-blue-500">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 rounded-full border overflow-hidden"
            >
              <img
                src="/assets/avatar.png"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                <Link to="/my-orders" className="block px-4 py-2 text-sm hover:bg-gray-100">My Orders</Link>
                <Link to="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Admin Dashboard</Link>
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-medium">
          <Link to="/" className="block hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          <Link to="/my-orders" className="block hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
          <Link to="/profile" className="block hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
          <Link to="/contact" className="block hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link to="/about" className="block hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/admin/dashboard" className="block hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-500">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="bg-yellow-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span>Cart</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-500">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
