import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export default function AdminMessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState<Contact | null>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/swiftshop/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.data);

          if (!data.data.isRead) {
            fetch(`http://localhost:5000/swiftshop/contacts/${id}/read`, {
              method: "PATCH",
            });
          }
        } else {
          toast.error("Message not found");
          navigate("/admin/messages");
        }
      })
      .catch(() => {
        toast.error("Server error");
        navigate("/admin/messages");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/swiftshop/contacts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message deleted");
        navigate("/admin/messages");
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleReply = async () => {
    if (!reply.trim() || !message) return;

    try {
      const res = await fetch("http://localhost:5000/swiftshop/contacts/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: message.email,
          name: message.name,
          message: reply,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Reply sent");
        setReply("");
      } else {
        toast.error("Reply failed");
      }
    } catch {
      toast.error("Server error sending reply");
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600 dark:text-gray-200">Loading...</div>;
  }

  if (!message) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full lg:w-1/5">
        <AdminSidebar />
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <button
          onClick={() => navigate("/admin/messages")}
          className="mb-4 text-sm text-blue-500 hover:underline flex items-center"
        >
          <ArrowLeft className="mr-1" size={16} />
          Back to messages
        </button>

        <div className="bg-white dark:bg-gray-800 shadow p-4 sm:p-6 rounded-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            From: {message.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Email: {message.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Date: {new Date(message.createdAt).toLocaleString()}
          </p>

          <p className="text-gray-700 dark:text-gray-200 border p-4 rounded-md mb-6 bg-gray-50 dark:bg-gray-700 text-sm sm:text-base">
            {message.message}
          </p>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Reply
            </label>
            <textarea
              className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:text-white text-sm sm:text-base"
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply here..."
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReply}
              className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              <Send size={16} className="mr-2" />
              Send Reply
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
