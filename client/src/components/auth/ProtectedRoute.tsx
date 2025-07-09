import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    // Not logged in, redirect to homepage (or show login modal if you're doing that)
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/" replace />;
  }

  return children;
}
