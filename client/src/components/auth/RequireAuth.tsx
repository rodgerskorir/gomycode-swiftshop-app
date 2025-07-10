import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth({ adminOnly = false }: { adminOnly?: boolean }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}