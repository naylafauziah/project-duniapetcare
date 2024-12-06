import { ThemeProvider } from "@/components/landing-page/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function Root({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
            <ReactQueryDevtools />
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default Root;
