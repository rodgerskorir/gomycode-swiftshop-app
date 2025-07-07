import { useState } from "react";
import { Pencil, User, Mail, MapPin } from "lucide-react";
import Footer from "../../components/footer/Footer";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";

export default function ProfilePage() {
  const [user] = useState({
    name: "Rodgers Korir",
    email: "rodgerskorir@gmail.com",
    phone: "070116352",
    address: "254 Nairobi St, Kenya",
    avatar: "/assets/images/shoe-blue1.png",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <LoggedInNavbar />

      {/* Main Content */}
      <main className="flex-grow px-4 py-10 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
              </div>
              
            </div>

            <button className="flex items-center gap-1 px-4 py-2 bg-black hover:bg-blue-700 text-white text-sm rounded-md self-start sm:self-auto">
              <Pencil size={16} /> Edit
            </button>
          </div>

          {/* Info Sections */}
          <div className="grid gap-6 sm:grid-cols-2">
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Account Info</h2>
              <div className="space-y-1 text-gray-700 text-sm">
                <p className="flex items-center gap-2"><User size={16} /> {user.name}</p>
                <p className="flex items-center gap-2"><Mail size={16} /> {user.email}</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Shipping Address</h2>
              <p className="flex items-center gap-2 text-gray-700 text-sm">
                <MapPin size={16} /> {user.address}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
