import { ThemeProvider } from "@/components/landing-page/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/auth-provider";
import { Outlet } from "react-router-dom";

function Root({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ThemeProvider>
        <AuthProvider>
          <Outlet />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default Root;
