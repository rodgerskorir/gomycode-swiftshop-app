

import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Footer from "../../components/footer/Footer";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LoggedInNavbar />

      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />

          <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. You’ll receive a confirmation email shortly.
          </p>

          <Link
            to="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
