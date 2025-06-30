import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { fetchDataFromApi } from "../utils/Api";
import { useUser } from "./UserContext";
import { FavoriteItem, FavoritesContextType } from "../types";

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  loading: false,
  refreshFavorites: () => {},
});

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const fetchFavorites = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const data = await fetchDataFromApi<FavoriteItem[]>(
        `/api/myList?userId=${user.id}`
      );
      if (Array.isArray(data)) {
        setFavorites(data);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  // Refresh when user ID changes
  useEffect(() => {
    if (user?.id) {
      fetchFavorites();
    }
  }, [user?.id]);

  const contextValue = useMemo(
    () => ({
      favorites,
      loading,
      refreshFavorites: fetchFavorites,
    }),
    [favorites, loading]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
