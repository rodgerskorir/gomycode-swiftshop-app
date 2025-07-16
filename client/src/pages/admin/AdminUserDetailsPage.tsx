import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import EditUserModal from "../../components/admin/EditUserModal";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";

interface FullUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export default function AdminUserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<FullUser | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const [userRes, orderRes] = await Promise.all([
          fetch(`http://localhost:5000/swiftshop/users/${id}`),
          fetch(`http://localhost:5000/swiftshop/orders/user/${id}`)
        ]);

        const userData = await userRes.json();
        const orderData = await orderRes.json();

        if (!userRes.ok || !userData.success) {
          throw new Error(userData.message || "Failed to fetch user.");
        }

        setUser(userData.data);
        setOrderCount(orderData.data?.length || 0);
      } catch (err: any) {
        toast.error(err.message || "Could not load user details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm || !user) return;

    try {
      const res = await fetch(`http://localhost:5000/swiftshop/users/${user._id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete user");

      toast.success("User deleted successfully.");
      navigate("/admin/users");
    } catch (err: any) {
      toast.error(err.message || "Delete failed.");
    }
  };

  const handleUpdateUser = (updated: FullUser) => {
    setUser(updated);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="p-6 text-gray-700 dark:text-white">Loading user details...</main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="p-6 text-red-500 dark:text-red-300">User not found.</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Details</h1>
          <div className="space-x-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 object-cover rounded-full border mb-4"
              onError={(e) => {
                e.currentTarget.src = "/assets/images/default-avatar.png";
              }}
            />
          )}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>Address:</strong> {user.address || "N/A"}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Total Orders:</strong> {orderCount}</p>
        </div>
      </main>

      {showEditModal && user && (
        <EditUserModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}
