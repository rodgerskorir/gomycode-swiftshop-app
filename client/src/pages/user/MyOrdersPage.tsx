import { useState, useContext } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import { Link } from "react-router-dom";
import { BadgeCheck, Clock, XCircle } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import LoginModal from "../../components/auth/LoginModal"; // adjust path as needed

interface Order {
  id: number;
  date: string;
  total: number;
  status: "Pending" | "Delivered" | "Cancelled";
}

const sampleOrders: Order[] = [
  { id: 104, date: "2025-06-29", total: 12000, status: "Delivered" },
  { id: 102, date: "2025-07-01", total: 8500, status: "Pending" },
  { id: 103, date: "2025-06-20", total: 7500, status: "Cancelled" },
  { id: 101, date: "2025-06-19", total: 6300, status: "Cancelled" },
];

export default function MyOrdersPage() {
  const { user } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(!user);

  const [orders] = useState<Order[]>(sampleOrders);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Pending" | "Delivered" | "Cancelled"
  >("All");
  const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest">("Newest");

  const filteredOrders = orders
    .filter((order) =>
      statusFilter === "All" ? true : order.status === statusFilter
    )
    .sort((a, b) =>
      sortOrder === "Newest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  if (!user) {
    return (
      <>
        <Navbar />
        <LoginModal onClose={() => setShowLogin(false)} onSwitch={() => {}} />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <LoggedInNavbar />

      <main className="flex-grow px-4 py-10 max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>

          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 rounded-md border text-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-4 py-2 rounded-md border text-sm"
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
                key={order.id}
                className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-600">Date: {order.date}</p>
                  <p className="text-sm text-gray-600">
                    Total: Ksh {order.total.toLocaleString()}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status === "Delivered" && <BadgeCheck size={16} />}
                    {order.status === "Pending" && <Clock size={16} />}
                    {order.status === "Cancelled" && <XCircle size={16} />}
                    {order.status}
                  </span>
                </div>

                <Link
                  to={`/my-orders/${order.id}`}
                  className="text-sm bg-black hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
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
