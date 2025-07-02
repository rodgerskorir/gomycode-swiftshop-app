import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16 py-6 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} SwiftShop. All rights reserved.</p>
        <div className="flex gap-4">
          
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
