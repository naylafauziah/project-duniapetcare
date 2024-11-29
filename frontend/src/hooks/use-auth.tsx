import { AuthContext } from "@/context/auth-provider";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error("useAuth can only be used within an AuthProvider");
  }

  return context;
}
