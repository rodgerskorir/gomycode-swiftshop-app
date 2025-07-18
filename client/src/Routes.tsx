import { Routes, Route } from "react-router-dom";

// Public pages
import WelcomePage from "./pages/WelcomePage";
import ProductsPage from "./pages/shop/ProductsPage";
import ProductDetailPage from "./pages/shop/ProductDetailPage";
import ContactPage from "./pages/contact/ContactPage";
import AboutPage from "./pages/contact/AboutUs";

// User account pages
import ProfilePage from "./pages/user/ProfilePage";
import MyOrdersPage from "./pages/user/MyOrdersPage";
import OrderDetailPage from "./pages/user/OrderDetailPage";

// Admin pages


// Cart & checkout
import CartPage from "./pages/shop/CartPage";
import CheckoutPage from "./pages/shop/CheckoutPage";
import OrderSuccessPage from "./pages/shop/OrderSuccessPage";

// System pages
import NotFoundPage from "./pages/system/NotFoundPage";
import ErrorPage from "./pages/system/ErrorPage";

// Route guards
import ProtectedRoute from "./components/auth/ProtectedRoute";

import ResetPassword from "./components/auth/ResetPassword";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminProductDetailsPage from "./pages/admin/AdminProductDetailsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUserDetailsPage from "./pages/admin/AdminUserDetailsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminMessageDetail from "./pages/admin/AdminMessageDetail";
import AdminRevenuePage from "./pages/admin/AdminRevenuePage";
import AdminReceiptDetails from "./pages/admin/AdminReceiptDetails";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* User (protected) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        }
      />
      {/* Admin (admin only) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:id"
        element={
          <ProtectedRoute>
            <AdminProductDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/revenue"
        element={
          <ProtectedRoute>
            <AdminRevenuePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/revenue/:id"
        element={
          <ProtectedRoute>
            <AdminReceiptDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute>
            <AdminUserDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <AdminOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders/:id"
        element={
          <ProtectedRoute>
            <AdminOrderDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <AdminMessagesPage />
          </ProtectedRoute>
        }
      />
         <Route
        path="/admin/messages/:id"
        element={
          <ProtectedRoute>
            <AdminMessageDetail />
          </ProtectedRoute>
        }
      />
      {/* Cart & Checkout */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      {/* System */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
      //reset password
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}
