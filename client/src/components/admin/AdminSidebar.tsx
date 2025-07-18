import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
  DollarSign,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/swiftshop/contacts/unread-count");
        setUnreadCount(res.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch unread count", err);
      }
    };
    fetchUnreadCount();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={20} /> },
    { name: "Revenue", path: "/admin/revenue", icon: <DollarSign size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <MessageSquare size={20} />,
      showBadge: unreadCount > 0,
    },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-900 border-b">
        <h2 className="text-xl font-bold text-blue-600">SwiftShop</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
</button>

      </div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 md:static top-0 left-0 h-full w-64 bg-gray-50 dark:bg-gray-900 border-r shadow-md transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-extrabold text-blue-600 tracking-tight">
            SwiftShop
          </h2>
          <p className="text-sm text-gray-400 font-medium mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive =
              item.path === "/admin"
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // Close menu on mobile
                className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 
                  ${isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </div>
                {item.name === "Messages" && unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 w-full text-left"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t text-xs text-gray-400">
          © {new Date().getFullYear()} SwiftShop. All rights reserved.
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
        />
      )}
    </>
  );
}
