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

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/users/${user._id}`);
        const data = await res.json();
        if (res.ok && data.success) {
          const u = data.data;
          setForm({
            name: u.name || "",
            email: u.email || "",
            phone: u.phone || "",
            address: u.address || "",
          });
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (err: any) {
        console.error("User fetch failed:", err);
        toast.error(err.message || "Error loading user info");
      }
    };

    fetchUser();
  }, [user, API]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const order = {
      userId: user?._id,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        size: item.selectedSize,
        price: item.price,
      })),
      total: subtotal,
      status: "pending",
      shippingAddress: form.address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to place order");
      }

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/order-success");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong while placing order");
    }
  };

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
                key={`${item._id}-${item.selectedSize}`}
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

          {/* M-Pesa Section */}
          <div className="mt-6 bg-white p-4 rounded border">
            <h3 className="font-semibold mb-2 text-gray-700">Payment Method</h3>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="mpesa"
                checked={paymentMethod === "mpesa"}
                onChange={() => setPaymentMethod("mpesa")}
              />
              <span>M-Pesa</span>
            </label>

            {paymentMethod === "mpesa" && (
              <div className="mt-4">
                <input
                  type="tel"
                  placeholder="M-Pesa Phone Number"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="w-full border px-4 py-2 rounded text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This number will be used to initiate payment.
                </p>
              </div>
            )}
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
