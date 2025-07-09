import { useState } from "react";
import { Edit, Trash2, UserPlus } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import EditUserModal from "../../components/admin/EditUserModal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joined: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Korir Rodgers",
    email: "korir@gmail.com",
    role: "admin",
    joined: "2025-01-15",
  },
  {
    id: 2,
    name: "Ann Key",
    email: "ann@gmail.com",
    role: "user",
    joined: "2025-03-12",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@gmail.com",
    role: "user",
    joined: "2025-05-02",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleUpdateUser = (updated: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Users</h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            <UserPlus size={16} /> Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border rounded-md">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">{user.joined}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                      className="inline-flex items-center justify-center p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="inline-flex items-center justify-center p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Edit User Modal */}
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
