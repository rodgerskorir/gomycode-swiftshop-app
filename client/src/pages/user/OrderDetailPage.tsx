import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import { BadgeCheck, Clock, XCircle } from "lucide-react";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";

// Example order item type
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
  selectedSize?: string;
}

interface Order {
  id: number;
  date: string;
  total: number;
  status: "Pending" | "Delivered" | "Cancelled";
  items: OrderItem[];
}

const sampleOrders: Order[] = [
  {
    id: 101,
    date: "2025-06-29",
    total: 12000,
    status: "Delivered",
    items: [
      {
        name: "Air Max 2024",
        quantity: 2,
        price: 4000,
        image: "/assets/images/shoe-blue.png",
        selectedSize: "42",
      },
      {
        name: "Ultraboost",
        quantity: 1,
        price: 4000,
        image: "/assets/images/shoe-red2.png",
        selectedSize: "41",
      },
    ],
  },
  {
    id: 102,
    date: "2025-07-01",
    total: 8500,
    status: "Pending",
    items: [
      {
        name: "Court Vision",
        quantity: 1,
        price: 8500,
        image: "/assets/images/shoe-green1.png",
        selectedSize: "40",
      },
    ],
  },
  {
    id: 103,
    date: "2025-07-01",
    total: 8500,
    status: "Pending",
    items: [
      {
        name: "Court Vision",
        quantity: 1,
        price: 8500,
        image: "/assets/images/shoe-green1.png",
        selectedSize: "40",
      },
    ],
  },
  {
    id: 104,
    date: "2025-07-01",
    total: 8500,
    status: "Pending",
    items: [
      {
        name: "Court Vision",
        quantity: 1,
        price: 8500,
        image: "/assets/images/shoe-green1.png",
        selectedSize: "40",
      },
    ],
  },
];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const foundOrder = sampleOrders.find((o) => o.id === Number(id));
    setOrder(foundOrder || null);
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Order not found. <Link to="/my-orders" className="text-blue-600 underline ml-2">Go back</Link></p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <LoggedInNavbar />

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order #{order.id}
          </h1>
          <p className="text-sm text-gray-600">Placed on {order.date}</p>
          <span
            className={`inline-flex items-center gap-1 mt-2 px-3 py-1 text-sm rounded-full font-medium ${
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

        {/* Order Items */}
        <div className="space-y-6">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded border"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                {item.selectedSize && (
                  <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                )}
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm text-gray-800 font-medium">
                Ksh {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
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
