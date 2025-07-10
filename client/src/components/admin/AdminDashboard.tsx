// components/admin/AdminDashboard.tsx

import {
  ShoppingBag,
  DollarSign,
  Users,
  PackageCheck,
  PackageX,
  BarChart3,
} from "lucide-react";

interface Order {
  total: number;
  date: string;
  status: string;
}

interface User {
  name: string;
}

interface Product {
  name: string;
  stock: number;
  sold: number;
}

interface AdminDashboardProps {
  orders: Order[];
  users: User[];
  products: Product[];
}

export default function AdminDashboard({ orders, users, products }: AdminDashboardProps) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = products.filter((p) => p.stock < 5);
  const topProducts = [...products].sort((a, b) => b.sold - a.sold);
  const recentOrders = [...orders].slice(0, 5);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Orders" value={orders.length} icon={<ShoppingBag size={20} />} />
        <DashboardCard title="Revenue" value={`Ksh ${totalRevenue.toLocaleString()}`} icon={<DollarSign size={20} />} />
        <DashboardCard title="Users" value={users.length} icon={<Users size={20} />} />
        <DashboardCard title="Products" value={products.length} icon={<PackageCheck size={20} />} />
        <DashboardCard title="Low Stock" value={lowStockProducts.length} icon={<PackageX size={20} />} />
        <DashboardCard title="Pending Orders" value={orders.filter((o) => o.status === "pending").length} icon={<BarChart3 size={20} />} />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Recent Orders
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="py-2">Date</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="border-t dark:border-gray-700">
                <td className="py-2 text-gray-700 dark:text-gray-300">{order.date}</td>
                <td className="py-2 text-gray-700 dark:text-gray-300">Ksh {order.total.toLocaleString()}</td>
                <td className="py-2 text-gray-700 dark:text-gray-300">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Products */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Top Selling Products
        </h2>
        <ul className="space-y-2">
          {topProducts.map((product, index) => (
            <li
              key={index}
              className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
            >
              <span>{product.name}</span>
              <span>{product.sold} sold</span>
            </li>
          ))}
        </ul>
      </div>
    </>
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
