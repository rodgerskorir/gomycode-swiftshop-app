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
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProductsPage from "./pages/admin/ProductsPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import RevenuePage from "./pages/admin/RevenuePage";
import AdminOrdersPage from "./pages/admin/OrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";

// Cart & checkout
import CartPage from "./pages/shop/CartPage";
import CheckoutPage from "./pages/shop/CheckoutPage";
import OrderSuccessPage from "./pages/shop/OrderSuccessPage";

// System pages
import NotFoundPage from "./pages/system/NotFoundPage";
import ErrorPage from "./pages/system/ErrorPage";

// Route guards
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminProductDetailsPage from "./pages/admin/AdminProductDetailsPage";
import AdminUserDetailsPage from "./pages/admin/AdminUserDetailsPage";
import ReceiptDetails from "./pages/admin/ReceiptDetails";
import ResetPassword from "./components/auth/ResetPassword";

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
            <AdminDashboard />
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
            <RevenuePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/revenue/:id"
        element={
          <ProtectedRoute>
            <ReceiptDetails />
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
