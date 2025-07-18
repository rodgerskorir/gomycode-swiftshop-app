import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
// import { useNavigate } from "react-router-dom";

interface Receipt {
  _id: string;
  customerName: string;
  createdAt: string;
  amount: number;
  itemsCount: number;
}

export default function RevenuePage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await fetch("http://localhost:5000/swiftshop/receipts");
        const data = await res.json();

        if (!res.ok || !data.success || !Array.isArray(data.data)) {
          throw new Error("Failed to fetch valid receipt data");
        }

        setReceipts(data.data);
      } catch (err: any) {
        setError("Failed to load receipts: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  const filteredReceipts = receipts.filter((r) => {
    const date = new Date(r.createdAt);
    const afterStart = startDate ? date >= new Date(startDate) : true;
    const beforeEnd = endDate ? date <= new Date(endDate) : true;
    return afterStart && beforeEnd;
  });

  const totalRevenue = filteredReceipts.reduce((sum, r) => sum + r.amount, 0);
  const totalOrders = filteredReceipts.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <h1 className="text-2xl font-bold mb-6">Revenue Dashboard</h1>

        {loading && <p>Loading receipts...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Filters */}
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

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                <h2 className="text-sm text-gray-500 dark:text-gray-400">
                  Total Revenue
                </h2>
                <p className="text-xl font-bold text-green-600">
                  Ksh {totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                <h2 className="text-sm text-gray-500 dark:text-gray-400">
                  Orders
                </h2>
                <p className="text-xl font-bold">{totalOrders}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                <h2 className="text-sm text-gray-500 dark:text-gray-400">
                  Avg. Order Value
                </h2>
                <p className="text-xl font-bold">
                  Ksh{" "}
                  {avgOrderValue.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="p-3 text-left">Invoice</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Items</th>
                    <th className="p-3 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReceipts.length > 0 ? (
                    filteredReceipts.map((r) => (
                      <tr
                        key={r._id}
                        className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="p-3 font-medium">
                          INV-{r._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="p-3">{r.customerName}</td>
                        <td className="p-3">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">{r.itemsCount}</td>
                        <td className="p-3 text-green-600 font-semibold">
                          Ksh {r.amount.toLocaleString()}
                        </td>
                        {/* <td>
                        <button
                          onClick={() => navigate(`/admin/revenue/${r._id}`)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                        >
                          View
                        </button>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-6 text-center text-gray-500 dark:text-gray-400"
                      >
                        No receipts found
                        {startDate || endDate ? " for selected dates" : ""}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
