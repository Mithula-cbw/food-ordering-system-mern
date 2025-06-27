import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { fetchDataFromApi } from "../utils/Api";

const USER_ID = "6859515c7e9a38910b5b3200";

export interface FavoriteItem {
  _id: string;
  productTitle: string;
  images: string;
  rating: number;
  price: number;
  productId: string;
  userId: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  loading: boolean;
  refreshFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  loading: false,
  refreshFavorites: () => {},
});

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFavorites = async () => {
    setLoading(true);
    const data = await fetchDataFromApi<FavoriteItem[]>(`/api/myList?userId=${USER_ID}`);
    if (Array.isArray(data)) {
      setFavorites(data);
    } else {
      setFavorites([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Fetching favorites...");
    fetchFavorites();
  }, []);

  
  const contextValue = useMemo(() => ({
    favorites,
    loading,
    refreshFavorites: fetchFavorites,
  }), [favorites, loading]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

