import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const receiptsPerPage = 10;

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

  const filteredAndSearchedReceipts = receipts.filter((r) => {
    const date = new Date(r.createdAt);
    const afterStart = startDate ? date >= new Date(startDate) : true;
    const beforeEnd = endDate ? date <= new Date(endDate) : true;
    const matchesSearch = r.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return afterStart && beforeEnd && matchesSearch;
  });

  const totalRevenue = filteredAndSearchedReceipts.reduce((sum, r) => sum + r.amount, 0);
  const totalOrders = filteredAndSearchedReceipts.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const startIndex = (currentPage - 1) * receiptsPerPage;
  const paginatedReceipts = filteredAndSearchedReceipts.slice(startIndex, startIndex + receiptsPerPage);
  const totalPages = Math.ceil(filteredAndSearchedReceipts.length / receiptsPerPage);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-64 w-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-2 sm:p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Revenue Dashboard
        </h1>

        {loading && <p className="text-sm">Loading receipts...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Filters & Search */}
            <div className="flex flex-wrap justify-between gap-2 sm:gap-4 mb-4 items-center text-xs">
              <div className="flex gap-2 items-center">
                <label>
                  Start:
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="ml-1 px-2 py-1 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </label>
                <label>
                  End:
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="ml-1 px-2 py-1 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </label>
              </div>

              <input
                type="text"
                placeholder="Search by customer name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2 py-1 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 w-full sm:w-64"
              />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-center">
                <h2 className="text-xs text-gray-500 dark:text-gray-400">Revenue</h2>
                <p className="text-base font-bold text-green-600">
                  Ksh {totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-center">
                <h2 className="text-xs text-gray-500 dark:text-gray-400">Orders</h2>
                <p className="text-base font-bold">{totalOrders}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-center">
                <h2 className="text-xs text-gray-500 dark:text-gray-400">Avg. Order</h2>
                <p className="text-base font-bold">
                  Ksh {avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow text-xs">
              <table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="p-2 text-left whitespace-nowrap">Invoice</th>
                    <th className="p-2 text-left whitespace-nowrap">Customer</th>
                    <th className="p-2 text-left whitespace-nowrap">Date</th>
                    <th className="p-2 text-left whitespace-nowrap">Items</th>
                    <th className="p-2 text-left whitespace-nowrap">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReceipts.length > 0 ? (
                    paginatedReceipts.map((r) => (
                      <tr
                        key={r._id}
                        className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="p-2 font-medium truncate max-w-[100px]">
                          INV-{r._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="p-2 truncate max-w-[120px]">{r.customerName}</td>
                        <td className="p-2">{new Date(r.createdAt).toLocaleDateString()}</td>
                        <td className="p-2">{r.itemsCount}</td>
                        <td className="p-2 text-green-600 font-semibold">
                          Ksh {r.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No receipts found
                        {startDate || endDate || searchTerm ? " for current filters" : ""}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-xs">
              <div className="flex gap-2 items-center">
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
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                Showing {paginatedReceipts.length} of {filteredAndSearchedReceipts.length} results
              </span>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
