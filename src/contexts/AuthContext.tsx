
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  position: string;
  contact: string;
  office: string;
  room: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be replaced with actual API call in production
      // For now, we'll simulate a successful login with mock data
      if (email === "admin@autopartner.com" && password === "admin") {
        const adminUser = {
          id: "1",
          name: "Администратор Системы",
          email: "admin@autopartner.com",
          role: "admin" as const,
          position: "Системный администратор",
          contact: "+7 (999) 123-45-67",
          office: "Главный офис",
          room: "101"
        };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
      } else if (email === "user@autopartner.com" && password === "user") {
        const regularUser = {
          id: "2",
          name: "Иван Петров",
          email: "user@autopartner.com",
          role: "user" as const,
          position: "Менеджер",
          contact: "+7 (999) 765-43-21",
          office: "Главный офис",
          room: "202"
        };
        setUser(regularUser);
        localStorage.setItem("user", JSON.stringify(regularUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
