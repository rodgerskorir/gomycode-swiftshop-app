import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const sampleReceipts = [
  {
    id: "INV-20250701",
    customer: "Rodgers Kipkurui",
    date: "2025-07-01",
    total: 12500,
    items: 3,
  },
  {
    id: "INV-20250628",
    customer: "Ann Key",
    date: "2025-06-28",
    total: 8400,
    items: 2,
  },
  {
    id: "INV-20250624",
    customer: "Alice Johnson",
    date: "2025-06-24",
    total: 17250,
    items: 5,
  },
];

export default function RevenuePage() {
  const [receipts] = useState(sampleReceipts);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredReceipts = receipts.filter((r) => {
    const date = new Date(r.date);
    const afterStart = startDate ? date >= new Date(startDate) : true;
    const beforeEnd = endDate ? date <= new Date(endDate) : true;
    return afterStart && beforeEnd;
  });

  const totalRevenue = filteredReceipts.reduce((sum, r) => sum + r.total, 0);
  const totalOrders = filteredReceipts.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Revenue Dashboard</h1>
        </div>

        {/* Date Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <label className="text-sm">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2 px-3 py-1 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white text-sm"
            />
          </label>
          <label className="text-sm">
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-2 px-3 py-1 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white text-sm"
            />
          </label>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <h2 className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</h2>
            <p className="text-xl font-bold text-green-600">Ksh {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <h2 className="text-sm text-gray-500 dark:text-gray-400">Orders</h2>
            <p className="text-xl font-bold">{totalOrders}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <h2 className="text-sm text-gray-500 dark:text-gray-400">Avg. Order Value</h2>
            <p className="text-xl font-bold">Ksh {avgOrderValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Receipts Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left">Invoice</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipts.map((r) => (
                <tr
                  key={r.id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-3 font-medium">{r.id}</td>
                  <td className="p-3">{r.customer}</td>
                  <td className="p-3">{r.date}</td>
                  <td className="p-3">{r.items}</td>
                  <td className="p-3 text-green-600 font-semibold">Ksh {r.total.toLocaleString()}</td>
                </tr>
              ))}
              {filteredReceipts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No receipts found for selected dates.
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
