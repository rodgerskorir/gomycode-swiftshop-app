import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
  onSwitch: () => void;
}

export default function LoginModal({ onClose, onSwitch }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Login
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              required
            />
          </div>
          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-700">
            Log In
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-blue-500 hover:underline font-bold"
          >
            Register Now
          </button>
        </p>
      </motion.div>
    </div>
  );
}
