import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import LoginModal from "../../components/auth/LoginModal";
import { AuthContext } from "../../context/AuthContext";
import { BadgeCheck, Clock } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size?: string;
  productId: string;
}

interface Order {
  _id: string;
  createdAt: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
  items: OrderItem[];
  userId: string;
}

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(!user);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API}/orders/${id}`);
        const data = await res.json();

        if (!res.ok || !data.success || !data.data) {
          setOrder(null);
        } else if (data.data.userId !== user._id) {
          // Prevent access to orders of other users
          setOrder(null);
        } else {
          setOrder(data.data);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  if (!user) {
    return (
      <>
        <Navbar />
        <LoginModal onClose={() => setShowLogin(false)} onSwitch={() => {}} />
      </>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <LoggedInNavbar />
        <main className="flex-grow flex items-center justify-center text-gray-600 px-4 text-center">
          <p>
            Order not found or unauthorized access.
            <Link to="/my-orders" className="text-blue-600 underline ml-2">
              Go back
            </Link>
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <LoggedInNavbar />

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order #{order._id.slice(-6).toUpperCase()}
          </h1>
          <p className="text-sm text-gray-600">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <span
            className={`inline-flex items-center gap-1 mt-2 px-3 py-1 text-sm rounded-full font-medium ${
              order.status === "delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {order.status === "delivered" && <BadgeCheck size={16} />}
            {order.status === "pending" && <Clock size={16} />}
            {order.status === "shipped" && <Clock size={16} />}
            {order.status === "paid" && <BadgeCheck size={16} />}
            {order.status}
          </span>
        </div>

        <div className="space-y-6">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center"
            >
              <div className="w-20 h-20 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-500">
                IMG
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                )}
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm text-gray-800 font-medium">
                Ksh {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <div className="bg-white rounded-xl shadow p-4 text-right w-full sm:w-1/2">
            <p className="text-sm text-gray-500">Order Total:</p>
            <p className="text-xl font-bold text-gray-900">
              Ksh {order.total.toLocaleString()}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
