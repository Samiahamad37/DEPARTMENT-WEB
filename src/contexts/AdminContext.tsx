import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AdminUser, AdminLoginRequest } from "../types/admin";
import { useAdminLogin } from "../hooks/useAdmin";

interface AdminContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AdminLoginRequest) => Promise<void>;
  logout: () => void;
  mustChangePassword: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = useAdminLogin();

  // Check for existing authentication on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("admin_user");

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.log(error);
        // Clear invalid stored data
        localStorage.removeItem("access_token");
        localStorage.removeItem("admin_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: AdminLoginRequest) => {
    const response = await loginMutation.mutateAsync(credentials);

    // Store authentication data
    localStorage.setItem("access_token", response.token);
    localStorage.setItem("admin_user", JSON.stringify(response.user));

    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user && !!token;
  const mustChangePassword = user?.must_change_password || false;

  return (
    <AdminContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        mustChangePassword,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminProvider");
  }
  return context;
};




