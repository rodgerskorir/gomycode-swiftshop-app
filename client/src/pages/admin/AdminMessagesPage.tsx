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
      const res = await fetch(`http://localhost:5000/swiftshop/contacts/${id}`, {
        method: "DELETE",
      });
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-64">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
        <div className="flex justify-between items-start sm:items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Contact Messages
          </h1>
        </div>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">Loading messages...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3 hidden md:table-cell">Email</th>
                  <th className="text-left p-3 hidden md:table-cell">Message</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((msg) => (
                    <tr
                      key={msg._id}
                      onClick={() => navigate(`/admin/messages/${msg._id}`)}
                      className={`cursor-pointer border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition 
                        ${
                          !msg.isRead
                            ? "bg-yellow-100 dark:bg-yellow-900 font-semibold"
                            : "text-gray-800 dark:text-white"
                        }`}
                    >
                      <td className="p-3">{msg.name}</td>
                      <td className="p-3 hidden md:table-cell">{msg.email}</td>
                      <td className="p-3 hidden md:table-cell max-w-xs truncate">{msg.message}</td>
                      <td className="p-3">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </td>
                      <td
                        className="p-3 text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-400">
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
