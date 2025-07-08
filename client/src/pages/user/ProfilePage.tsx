import { useState, useContext } from "react";
import { Pencil, User, Mail, MapPin } from "lucide-react";
import Footer from "../../components/footer/Footer";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Navbar from "../../components/navbar/Navbar";
import LoginModal from "../../components/auth/LoginModal";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(!user);

  if (!user && !showLoginModal) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {user ? <LoggedInNavbar /> : <Navbar />}
      {!user && showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onSwitch={() => {}} />
      )}

      {user && (
        <main className="flex-grow px-4 py-10 bg-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/shoe-blue1.png"
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full border object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Rodgers Korir</h1>
                  <p className="text-sm text-gray-500">rodgerskorir@gmail.com</p>
                  <p className="text-sm text-gray-500">070116352</p>
                </div>
              </div>

              <button className="flex items-center gap-1 px-4 py-2 bg-black hover:bg-blue-700 text-white text-sm rounded-md self-start sm:self-auto">
                <Pencil size={16} /> Edit
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Account Info</h2>
                <div className="space-y-1 text-gray-700 text-sm">
                  <p className="flex items-center gap-2"><User size={16} /> Rodgers Korir</p>
                  <p className="flex items-center gap-2"><Mail size={16} /> rodgerskorir@gmail.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Shipping Address</h2>
                <p className="flex items-center gap-2 text-gray-700 text-sm">
                  <MapPin size={16} /> 254 Nairobi St, Kenya
                </p>
              </section>

              <section className="sm:col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Security</h2>
                <button className="px-4 py-2 bg-black hover:bg-blue-700 text-sm rounded-md text-white">
                  Change Password
                </button>
              </section>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
