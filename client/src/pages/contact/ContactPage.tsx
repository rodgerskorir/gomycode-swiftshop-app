import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const { user } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {user ? <LoggedInNavbar /> : <Navbar />}
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Get in Touch
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-md space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
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

              <h3 className="text-lg font-semibold mt-6 text-gray-700">
                Follow Us
              </h3>
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
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Visit Us
                </h3>
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
