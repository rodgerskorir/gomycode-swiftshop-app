import { Routes, Route } from "react-router-dom";

// Public pages
import WelcomePage from "./pages/WelcomePage";
import ProductsPage from "./pages/shop/ProductsPage";
import ProductDetailPage from "./pages/shop/ProductDetailPage";
import ContactPage from "./pages/contact/ContactPage";
import AboutPage from "./pages/contact/AboutUs";

// Auth pages



// User account pages
import ProfilePage from "./pages/user/ProfilePage";
import MyOrdersPage from "./pages/user/MyOrdersPage";
import OrderDetailPage from "./pages/user/OrderDetailPage";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProductsPage from "./pages/admin/ProductsPage";
import EditProductPage from "./pages/admin/EditProductPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import EditUserPage from "./pages/admin/EditUserPage";
import AdminOrdersPage from "./pages/admin/OrdersPage";

// Cart & checkout
import CartPage from "./pages/shop/CartPage";
import CheckoutPage from "./pages/shop/CheckoutPage";
import OrderSuccessPage from "./pages/shop/OrderSuccessPage";

// System pages
import NotFoundPage from "./pages/system/NotFoundPage";
import ErrorPage from "./pages/system/ErrorPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Auth */}
      
   

      {/* User */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/my-orders" element={<MyOrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/products/:id/edit" element={<EditProductPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/users/:id/edit" element={<EditUserPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />

      {/* Cart & Checkout */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />

      {/* System */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
