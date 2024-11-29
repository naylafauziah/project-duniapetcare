import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

function AuthRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AuthRoute;
