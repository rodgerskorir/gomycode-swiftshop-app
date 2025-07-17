import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
  onSwitch?: () => void;
}

export default function LoginModal({ onClose, onSwitch }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    const isEmail = identifier.includes("@");
    const payload = {
      password,
      ...(isEmail ? { email: identifier } : { username: identifier }),
    };

    try {
      const res = await fetch("http://localhost:5000/swiftshop/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      login(data.user);
      onClose();
      navigate(data.user?.role === "admin" ? "/admin/" : "/");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/swiftshop/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }

      setMessage("Reset link sent! Check your email.");
    } catch {
      setError("Server error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          {forgotMode ? "Reset Password" : "Login"}
        </h2>

        {(error || message) && (
          <p className={`text-center text-sm mb-2 ${error ? "text-red-500" : "text-green-600"}`}>
            {error || message}
          </p>
        )}

        <form onSubmit={forgotMode ? handleForgot : handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              {forgotMode ? "Email address" : "Email or Username"}
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          {!forgotMode && (
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white ${
              isLoading ? "bg-gray-400" : "bg-black hover:bg-blue-700"
            }`}
          >
            {isLoading
              ? "Processing..."
              : forgotMode
              ? "Send Reset Link"
              : "Log In"}
          </button>
        </form>

        {!forgotMode && (
          <p className="text-xs mt-2 text-right">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {
                setForgotMode(true);
                setError("");
                setMessage("");
              }}
            >
              Forgot password?
            </button>
          </p>
        )}

        <p className="text-sm mt-4 text-center">
          {forgotMode ? (
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setForgotMode(false)}
            >
              Back to login
            </button>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-blue-500 hover:underline font-bold"
              >
                Register Now
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}
