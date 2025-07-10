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
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
