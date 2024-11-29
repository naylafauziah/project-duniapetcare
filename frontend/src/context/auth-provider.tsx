import { User } from "@/types/user";
import { checkIsAuthenticated } from "@/utils/authService";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
};

type AuthProviderProps = {
  children?: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const resUser = await checkIsAuthenticated();
      setUser(resUser);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAuth = async () => {
    setIsLoading(true);
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
