import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function AdminMessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

 useEffect(() => {
  fetch("http://localhost:5000/swiftshop/contacts")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const sorted = data.data.sort(
          (a: Contact, b: Contact) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setContacts(sorted);
      } else {
        toast.error("Failed to fetch messages");
      }
    })
    .catch(() => toast.error("Could not load messages"))
    .finally(() => setLoading(false));
}, []);


  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/swiftshop/contacts/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((msg) => msg._id !== id));
        toast.success("Message deleted");
      } else {
        toast.error("Failed to delete message");
      }
    } catch (err) {
      toast.error("Server error deleting message");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Contact Messages
          </h1>
        </div>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">
            Loading messages...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded-md">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((msg) => (
                    <tr
                      key={msg._id}
                      className={`text-sm border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800
    ${
      !msg.isRead
        ? "bg-yellow-100 dark:bg-yellow-900 font-semibold"
        : "text-gray-700 dark:text-gray-200"
    }`}
                    >
                      <td className="p-4 font-medium">{msg.name}</td>
                      <td className="p-4">{msg.email}</td>
                      <td className="p-4 max-w-xs truncate">{msg.message}</td>
                      <td className="p-4">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => navigate(`/admin/messages/${msg._id}`)}
                          className="inline-flex items-center justify-center p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                          title="View"
                        >
                          {/* <Eye size={16} /> */}
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="inline-flex items-center justify-center p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
