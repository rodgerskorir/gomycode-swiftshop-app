
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
      <p className="text-xl text-white mb-6">Something went wrong. Please try again later.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
