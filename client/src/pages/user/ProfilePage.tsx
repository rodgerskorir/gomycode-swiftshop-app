import { useState, useEffect, useContext } from "react";
import { Pencil, User, Mail, MapPin } from "lucide-react";
import Footer from "../../components/footer/Footer";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Navbar from "../../components/navbar/Navbar";
import LoginModal from "../../components/auth/LoginModal";
import { AuthContext } from "../../context/AuthContext";

interface FullUser {
  _id: string;  // Changed from 'id' to '_id' to match MongoDB
  username: string;
  email: string;
  address?: string;
  phone?: string;
  avatar?: string;
}

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(!user);
  const [fullUser, setFullUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/users/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        
        const data = await res.json();
        setFullUser(data);  
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, API]);  

  if (!user && !showLoginModal) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {user ? <LoggedInNavbar /> : <Navbar />}
        <main className="flex-grow flex justify-center items-center">
          <p className="text-gray-600">Loading profile...</p>
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
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={fullUser.avatar || "/assets/images/default-avatar.png"}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full border object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {fullUser.username}
                  </h1>
                  <p className="text-sm text-gray-500">{fullUser.email}</p>
                  {fullUser.phone && (
                    <p className="text-sm text-gray-500">{fullUser.phone}</p>
                  )}
                </div>
              </div>

              <button className="flex items-center gap-1 px-4 py-2 bg-black hover:bg-blue-700 text-white text-sm rounded-md self-start sm:self-auto">
                <Pencil size={16} /> Edit
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Account Info
                </h2>
                <div className="space-y-1 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <User size={16} /> {fullUser.username}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} /> {fullUser.email}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Shipping Address
                </h2>
                <p className="flex items-center gap-2 text-gray-700 text-sm">
                  <MapPin size={16} />{" "}
                  {fullUser.address || "No address added yet"}
                </p>
              </section>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}