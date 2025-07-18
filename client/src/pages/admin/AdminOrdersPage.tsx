import { useEffect, useState } from "react";
import { Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Order {
  _id: string;
  userId: string;
  total: number;
  status: "pending" | "delivered" | "canceled";
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/swiftshop/orders");
        const data = await res.json();
        if (data.success) setOrders(data.data);
        else throw new Error(data.message || "Failed to fetch orders");
      } catch (err: any) {
        toast.error(err.message || "Failed to load orders.");
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (
    id: string,
    status: "delivered" | "canceled"
  ) => {
    setLoadingId(id);
    try {
      const res = await fetch(`http://localhost:5000/swiftshop/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update status");
      }

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
      toast.success("Order status updated");
    } catch (err: any) {
      toast.error(err.message || "Error updating order");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    setLoadingId(id);
    try {
      const res = await fetch(`http://localhost:5000/swiftshop/orders/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete order");
      }

      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.success("Order deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete order.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filter === "all" || o.status === filter;
    const matchesSearch =
      o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.userId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-64">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Orders
        </h1>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex gap-2 items-center">
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Filter:
            </label>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-2 py-1 rounded-md text-sm bg-white dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search by order ID or user ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2 py-1 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 w-full sm:w-64 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="overflow-x-auto rounded-md shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="text-left p-2 sm:p-3">Order</th>
                <th className="text-left p-2 sm:p-3 hidden md:table-cell">User</th>
                <th className="text-left p-2 sm:p-3">Date</th>
                <th className="text-left p-2 sm:p-3 hidden sm:table-cell">Total</th>
                <th className="text-left p-2 sm:p-3 hidden sm:table-cell">Status</th>
                <th className="text-left p-2 sm:p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  <td
                    className="p-2 sm:p-3 cursor-pointer"
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                  >
                    #{order._id.slice(-6)}
                  </td>
                  <td className="p-2 sm:p-3 hidden md:table-cell">{order.userId}</td>
                  <td className="p-2 sm:p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 sm:p-3 hidden sm:table-cell">
                    Ksh {order.total.toLocaleString()}
                  </td>
                  <td className="p-2 sm:p-3 hidden sm:table-cell">
                    <span
                      className={`inline-block px-2 py-0.5 text-[11px] rounded-full font-medium ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td
                    className="p-2 sm:p-3 space-x-1 flex flex-wrap items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={16} />
                    </button>

                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order._id, "delivered")}
                          disabled={loadingId === order._id}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, "canceled")}
                          disabled={loadingId === order._id}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDelete(order._id)}
                      disabled={loadingId === order._id}
                      className={`text-red-600 hover:text-red-800 ${
                        loadingId === order._id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <span className="text-gray-500 dark:text-gray-400">
            Showing {paginatedOrders.length} of {filteredOrders.length} results
          </span>
        </div>
      </main>
    </div>
  );
}
