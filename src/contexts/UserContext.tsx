// context/UserContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User, UserContextType } from "../types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    // Simulate saving dummy user (for development only)
    localStorage.setItem(
      "user",
      JSON.stringify({
        status: true,
        user: {
          _id: "6859515c7e9a38910b5b3200",
          name: "user21",
          phone: "1231231444",
          email: "user123@gmail.com",
          password:
            "$2b$10$mHo/Z42wrXZzLAuS2uIc5ubr9TmL9GwLl8jZaMV2BV5Hh/7RYm1Qu",
          isAdmin: false,
          __v: 0,
          id: "6859515c7e9a38910b5b3200",
        },
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxMjNAZ21haWwuY29tIiwiaWQiOiI2ODU5NTE1YzdlOWEzODkxMGI1YjMyMDAiLCJpYXQiOjE3NTExOTQ4NTl9.FDEHZPgef7Im_MgmBYC2_ewWlcHKzabYJ16J1PJYWJg",
        msg: "User Authenticated",
      })
    );

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const rawUser = parsed.user;
        const token = parsed.token;

        const formattedUser: User = {
          id: rawUser.id,
          name: rawUser.name,
          email: rawUser.email,
          phone: rawUser.phone,
          isAdmin: rawUser.isAdmin,
          token: token,
        };

        setUserState(formattedUser);
        console.log("Loaded user:", formattedUser.id);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      if (newUser.token) localStorage.setItem("token", newUser.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, setUser, logout }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
