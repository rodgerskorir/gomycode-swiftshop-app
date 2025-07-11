import { useState, useEffect, useContext } from "react";
import { Pencil, User, Mail, MapPin, Phone } from "lucide-react";
import Footer from "../../components/footer/Footer";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Navbar from "../../components/navbar/Navbar";
import LoginModal from "../../components/auth/LoginModal";
import EditProfileModal from "../../components/profile/EditProfileModal";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import type { FullUser } from "../../types/User";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(!user);
  const [fullUser, setFullUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || !user._id) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const url = `${API}/users/${user._id}`;
        const res = await fetch(url);
        const result = await res.json();

        if (!res.ok || !result.success || !result.data) {
          throw new Error(result.message || "User not found");
        }

        setFullUser(result.data);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        toast.error(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, API]);

  const handleProfileUpdate = (updated: FullUser) => {
    setFullUser(updated);
  };

  if (!user && !showLoginModal) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">
          <p className="text-gray-600 text-center">
            Please log in to view your profile.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {user ? <LoggedInNavbar /> : <Navbar />}
        <main className="flex-grow flex justify-center items-center px-4">
          <p className="text-gray-600 text-center">Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {user ? <LoggedInNavbar /> : <Navbar />}
      {!user && showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {user && fullUser && (
        <main className="flex-grow px-4 py-10 bg-white">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Top section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-center sm:text-left">
                <img
                  src={
                    fullUser.avatar
                      ? `${
                          import.meta.env.VITE_API_URL
                        }/${fullUser.avatar.replace(/^\/+/, "")}`
                      : "/assets/images/default-avatar.png"
                  }
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/default-avatar.png";
                  }}
                  alt="User Avatar"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border object-cover mx-auto sm:mx-0"
                />

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {fullUser.username}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500">
                    {fullUser.email}
                  </p>
                  {fullUser.phone && (
                    <p className="text-sm sm:text-base text-gray-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
                      <Phone size={14} /> {fullUser.phone}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="w-full sm:w-auto flex justify-center items-center gap-1 px-4 py-2 bg-black hover:bg-blue-700 text-white text-sm rounded-md"
              >
                <Pencil size={16} /> Edit
              </button>
            </div>

            {/* Info sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Account Info
                </h2>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <User size={16} /> {fullUser.username}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} /> {fullUser.email}
                  </p>
                </div>
              </section>

              <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Shipping Address
                </h2>
                <p className="flex items-center gap-2 text-gray-700 text-sm">
                  <MapPin size={16} />
                  {fullUser.address?.trim()
                    ? fullUser.address
                    : "No address added yet"}
                </p>
              </section>
            </div>
          </div>
        </main>
      )}

      {showEditModal && fullUser && (
        <EditProfileModal
          user={fullUser}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}

      <Footer />
    </div>
  );
}
