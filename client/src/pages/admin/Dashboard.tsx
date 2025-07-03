import { useEffect, useState } from "react";
import { ShoppingBag, DollarSign, Users, PackageCheck } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";

interface Order {
  total: number;
}

interface User {
  name: string;
}

interface Product {
  name: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // dummy data
    setOrders([{ total: 10000 }, { total: 5000 }]);
    setUsers([{ name: "User1" }, { name: "User2" }]);
    setProducts([{ name: "Sneaker" }, { name: "T-shirt" }]);
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Orders"
            value={orders.length}
            icon={<ShoppingBag size={20} />}
          />
          <DashboardCard
            title="Revenue"
            value={`Ksh ${totalRevenue.toLocaleString()}`}
            icon={<DollarSign size={20} />}
          />
          <DashboardCard
            title="Users"
            value={users.length}
            icon={<Users size={20} />}
          />
          <DashboardCard
            title="Products"
            value={products.length}
            icon={<PackageCheck size={20} />}
          />
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center gap-4">
      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
