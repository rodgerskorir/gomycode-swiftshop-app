import { motion } from "framer-motion";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 lg:px-20 py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            About SwiftShop
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At SwiftShop, we're passionate about bringing you the latest trends
            in footwear with unmatched ease, speed, and style.
          </p>
        </motion.section>

        {/* Company Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To empower every individual to walk confidently by providing
              high-quality, stylish, and affordable footwear through an
              easy-to-use, reliable online platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To become Africa’s most trusted and innovative destination for
              sneaker lovers, athletes, and everyday wearers.
            </p>
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Why Choose SwiftShop?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We get your shoes to your doorstep quickly with our trusted
                delivery network.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Trusted Brands</h3>
              <p className="text-gray-600">
                We stock only genuine products from top brands like Nike,
                Adidas, Puma, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">
                Your privacy and transactions are protected with our secure
                payment system.
              </p>
            </div>
          </div>
        </motion.section>
      </main>
      {/* Social Media Links */}
      <section className="text-center mt-12">
        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center gap-6 text-gray-600">
          <a
            href="https://facebook.com/swiftshop"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/swiftshop"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com/swiftshop"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <Instagram className="w-6 h-6" />
          </a>
          
        </div>
      </section>

      <Footer />
    </div>
  );
}
