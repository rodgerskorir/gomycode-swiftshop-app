import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth({ adminOnly = false }: { adminOnly?: boolean }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />; // not logged in
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />; // not admin
  }

  return <Outlet />; // allow access
}
