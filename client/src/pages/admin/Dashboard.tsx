import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminDashboard from "../../components/admin/AdminDashboard"; // Use the extracted component

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, usersRes, productsRes] = await Promise.all([
          fetch("http://localhost:5000/swiftshop/orders"),
          fetch("http://localhost:5000/swiftshop/users"),
          fetch("http://localhost:5000/swiftshop/products"),
        ]);

        const ordersData = await ordersRes.json();
        const usersData = await usersRes.json();
        const productsData = await productsRes.json();

        if (ordersData.success) setOrders(ordersData.data);
        if (usersData.success) setUsers(usersData.data);
        if (productsData.success) setProducts(productsData.data);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
        <AdminDashboard orders={orders} users={users} products={products} />
      </main>
    </div>
  );
}
