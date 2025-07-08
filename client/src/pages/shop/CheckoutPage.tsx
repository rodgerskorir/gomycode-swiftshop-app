import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/cart/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/footer/Footer";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import LoginModal from "../../components/auth/LoginModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // Payment logic would go here (e.g., integration with M-Pesa or Stripe)

    toast.success("Order placed successfully!");
    clearCart();
    navigate("/order-success");
  };

  // ❌ Block access if not logged in
  if (!user) {
    return (
      <>
        <LoggedInNavbar />
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onSwitch={() => setShowLoginModal(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LoggedInNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item) => (
              <li
                key={`${item.id}-${item.selectedSize}`}
                className="py-3 flex justify-between"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize} x {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  Ksh {(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>Ksh {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Shipping</span>
            <span>Ksh 0.00</span>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t pt-4">
            <span>Total</span>
            <span>Ksh {subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-blue-600 transition"
          >
            Place Order
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
