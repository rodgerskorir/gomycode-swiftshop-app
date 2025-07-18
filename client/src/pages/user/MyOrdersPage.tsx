import { useState, useEffect, useContext } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import { Link } from "react-router-dom";
import { BadgeCheck, Clock } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import LoginModal from "../../components/auth/LoginModal";

interface Order {
  _id: string;
  createdAt: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
}

export default function MyOrdersPage() {
  const { user } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(!user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"All" | "pending" | "paid" | "shipped" | "delivered">("All");
  const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest">("Newest");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API}/orders`);
        const data = await res.json();

        if (res.ok && data.success) {
          const userOrders = data.data.filter((order: any) => order.userId === user._id);
          setOrders(userOrders);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const filteredOrders = orders
    .filter((order) =>
      statusFilter === "All" ? true : order.status.toLowerCase() === statusFilter.toLowerCase()
    )
    .sort((a, b) =>
      sortOrder === "Newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  if (!user) {
    return (
      <>
        <Navbar />
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSwitch={() => {}} />}
      </>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <LoggedInNavbar />

      <main className="flex-grow px-4 py-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
              className="px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Newest">Sort: Newest</option>
              <option value="Oldest">Sort: Oldest</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No orders found for this filter.</p>
            <Link
              to="/products"
              className="text-blue-600 hover:underline mt-4 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1 w-full">
                  <p className="text-lg font-semibold text-gray-900 break-all">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: Ksh {order.total.toLocaleString()}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium ${
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

                <Link
                  to={`/my-orders/${order._id}`}
                  className="text-sm bg-black hover:bg-blue-700 text-white px-4 py-2 rounded-md transition w-full sm:w-auto text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
