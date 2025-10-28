import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  fullName: string;
  phone: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would validate against the database
      // For this demo, we'll check localStorage (simulating database check)
      const storedUser = localStorage.getItem(`user_${email}`);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
          const user: User = {
            email: userData.email,
            fullName: userData.fullName,
            phone: userData.phone,
            address: userData.address,
          };
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};