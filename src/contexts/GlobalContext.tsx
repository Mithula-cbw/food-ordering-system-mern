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

  recentSearches: string[];
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [recentlyVisited, setRecentlyVisited] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentsLoading, setRecentsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedVisited = localStorage.getItem("recentlyVisited");
    const storedSearches = localStorage.getItem("recentSearches");

    try {
      if (storedVisited) {
        setRecentlyVisited(JSON.parse(storedVisited));
      }
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (err) {
      console.error("Failed to parse localStorage:", err);
    }

    setRecentsLoading(false);
  }, []);

  useEffect(() => {
    if (!recentsLoading) {
      localStorage.setItem("recentlyVisited", JSON.stringify(recentlyVisited));
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentlyVisited, recentSearches, recentsLoading]);

  const addRecentlyVisited = (product: Product) => {
    setRecentlyVisited((prev) => {
      const filtered = prev.filter((p) => p._id !== product._id);
      const updated = [product, ...filtered];
      console.log("Updating recentlyVisited:", product._id);
      return updated.slice(0, 10);
    });
  };

  const addRecentSearch = (search: string) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (s) => s.toLowerCase() !== search.toLowerCase()
      );
      const updated = [search, ...filtered];
      return updated.slice(0, 10);
    });
  };

  const clearRecentSearches = () => {
  setRecentSearches([]);
};

  return (
    <GlobalContext.Provider
      value={{
        recentlyVisited,
        addRecentlyVisited,
        recentsLoading,
        recentSearches,
        addRecentSearch,
        clearRecentSearches
      }}
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
