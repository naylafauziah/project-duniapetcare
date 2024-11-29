import AuthProvider from "@/context/auth-provider";
import { Outlet } from "react-router-dom";

function Root({ className }: { className?: string }) {
  return (
    <div className={className}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default Root;
