import { User, UserContextType } from "../types";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isVeg, setIsVeg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isLoggedIn = !!user;

  // Load from localStorage on mount
  useEffect(() => {
    setLoading(true)
    const storedUser = localStorage.getItem("user");
    const storedIsVeg = localStorage.getItem("isVeg");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      } finally {
         setLoading(false);
      }
    }
    setLoading(false);
    if (storedIsVeg !== null) {
      setIsVeg(storedIsVeg === "true");
    }
  }, []);

  // Save user + isVeg to localStorage when updated
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isVeg", String(user.isVegan)); // from user object
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("isVeg");
    }
  }, [user]);

  // Save isVeg independently if toggled manually
  useEffect(() => {
    localStorage.setItem("isVeg", String(isVeg));
  }, [isVeg]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, isVeg, setIsVeg, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to access context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
