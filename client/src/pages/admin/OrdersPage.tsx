import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast } from "react-toastify";

interface Order {
  _id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

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

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Orders
        </h1>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">User ID</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  <td className="p-3">#{order._id.slice(-6)}</td>
                  <td className="p-3 font-medium">{order.userId}</td>
                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">Ksh {order.total.toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-medium
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(order._id)}
                      disabled={loadingId === order._id}
                      className={`inline-flex items-center justify-center p-2 rounded-md text-white ${
                        loadingId === order._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
