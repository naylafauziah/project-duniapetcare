import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
