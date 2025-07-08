import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../context/AuthContext"; // ✅ Use auth context

export default function ContactPage() {
  const { user } = useAuth(); // ✅ Get reactive user

  return (
    <>
      {user ? <LoggedInNavbar /> : <Navbar />} {/* ✅ Dynamic navbar */}

      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Get in Touch
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <form className="bg-white p-8 rounded-xl shadow-md space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Our Store</h2>

              <div className="flex items-center gap-4 text-gray-600">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Nairobi, Kenya – SwiftShop Plaza, 4th Floor</span>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <Phone className="w-5 h-5 text-black" />
                <span>+254 701 163 576</span>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <Mail className="w-5 h-5 text-black" />
                <span>kipkuruikorir968@gmail.com</span>
              </div>

              <h3 className="text-lg font-semibold mt-6 text-gray-700">Follow Us</h3>
              <div className="flex gap-4 text-gray-500">
                <a
                  href="https://facebook.com/swiftshop"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/swiftshop"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-500"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/swiftshop"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-500"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Visit Us</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    title="SwiftShop Map"
                    src="https://maps.google.com/maps?q=nairobi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-60 rounded-md border-none"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
