import { Product } from "../types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface GlobalContextType {
  recentlyVisited: Product[];
  addRecentlyVisited: (product: Product) => void;
  recentsLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [recentlyVisited, setRecentlyVisited] = useState<Product[]>([]);
  const [recentsLoading, setRecentsLoading] = useState<boolean>(true); // start as loading

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("recentlyVisited");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentlyVisited(parsed);
      } catch (err) {
        console.error("Failed to parse recentlyVisited from localStorage:", err);
      }
    }
    setRecentsLoading(false);
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    if (recentsLoading) return;
    localStorage.setItem("recentlyVisited", JSON.stringify(recentlyVisited));
  }, [recentlyVisited, recentsLoading]);

  const addRecentlyVisited = (product: Product) => {
    setRecentlyVisited((prev) => {
      const filtered = prev.filter((p) => p._id !== product._id);
      const updated = [product, ...filtered];
      console.log("Updating recentlyVisited:", product._id);
      return updated.slice(0, 10);
    });
  };

  return (
    <GlobalContext.Provider
      value={{ recentlyVisited, addRecentlyVisited, recentsLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
};
