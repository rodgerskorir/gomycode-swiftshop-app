import { useEffect, useState } from "react";
import { Edit, Trash2, UserPlus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import EditUserModal from "../../components/admin/EditUserModal";
import { toast } from "react-toastify";

interface User {
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

const USERS_PER_PAGE = 10;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/swiftshop/users");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setUsers(data.data);
          setFilteredUsers(data.data);
        }
      } catch (err) {
        toast.error("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(1);
  }, [search, users]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/swiftshop/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        toast.success("User deleted successfully.");
      } else {
        toast.error(data.message || "Failed to delete user.");
      }
    } catch (err) {
      toast.error("Error deleting user.");
    }
  };

  const handleUpdateUser = (updated: User) => {
    setUsers((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
  };

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-64">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Users
          </h1>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            <UserPlus size={16} /> Add User
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6 text-sm">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-8 pr-3 py-2 border rounded-md w-full bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3 hidden sm:table-cell">Email</th>
                <th className="text-left p-3 hidden md:table-cell">Role</th>
                <th className="text-left p-3 hidden md:table-cell">Joined</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((u) => (
                <tr
                  key={u._id}
                  onClick={() => navigate(`/admin/users/${u._id}`)}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white cursor-pointer"
                >
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 hidden sm:table-cell">{u.email}</td>
                  <td className="p-3 hidden md:table-cell capitalize">{u.role}</td>
                  <td className="p-3 hidden md:table-cell">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="p-3 space-x-2 flex"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setShowEditModal(true);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2 text-sm">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-3 py-1 rounded-md border ${
                  page === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </main>

      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}
