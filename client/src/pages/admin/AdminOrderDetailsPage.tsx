import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

interface Item {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface Order {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
    phone?: string;
    address?: string;
  };
  total: number;
  status: string;
  createdAt: string;
  items: Item[];
}

export default function AdminOrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/swiftshop/orders/${id}`);
        const data = await res.json();

        if (!res.ok || !data.success)
          throw new Error(data.message || "Failed to fetch order");

        setOrder(data.data);
      } catch (err: any) {
        toast.error(err.message || "Could not load order details.");
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-64">
          <AdminSidebar />
        </div>
        <main className="flex-1 p-6 text-gray-700 dark:text-white">
          Loading...
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-64">
        <AdminSidebar />
      </div>
      <main className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Back Link */}
        <button
          onClick={() => navigate("/admin/orders")}
          className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-4 hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Orders
        </button>

        <h1 className="text-2xl font-bold mb-6">Order Details</h1>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Order Info</h2>
            <p>
              <strong>Order ID:</strong> #{order._id.slice(-6)}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> Ksh {order.total.toLocaleString()}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {/* User Info */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">User Info</h2>
            <p>
              <strong>Name:</strong> {order.userId.username}
            </p>
            <p>
              <strong>Email:</strong> {order.userId.email}
            </p>
            {order.userId.phone && (
              <p>
                <strong>Phone:</strong> {order.userId.phone}
              </p>
            )}
            <p>
              <strong>Address:</strong> {order.userId.address || "N/A"}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Items</h2>
            <ul className="divide-y divide-gray-300 dark:divide-gray-700">
              {order.items.map((item, index) => (
                <li key={index} className="py-2">
                  <p>
                    <strong>{item.name}</strong> x {item.quantity} (Size:{" "}
                    {item.size})
                  </p>
                  <p>Subtotal: Ksh {(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
