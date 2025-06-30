
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-6xl font-bold text-red-700 mb-4">404</h1>
      <p className="text-xl text-white mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-900  text-white rounded-lg hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
