import React, { createContext, useEffect, useState, ReactNode } from "react";
import { fetchDataFromApi } from "../utils/Api";

// --- Types ---
export interface Category {
  _id: string;
  name: string;
  images: string[];
  color: string;
  description: string;
  __v: number;
  id: string;
}

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// --- Context ---
export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  loading: false,
  error: null,
});

// --- State Provider ---
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const data = await fetchDataFromApi<Category[]>("/api/category");

      if (Array.isArray(data)) {
        setCategories(data);
        setError(null);
      } else {
        setCategories([]);
        setError("Failed to fetch categories");
      }

      setLoading(false);
    };

    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};

// --- Category Types Extractor ---
export const categoryTypes = (categories: Category[]): { id: string; name: string }[] => {
  return categories.map(({ id, name }) => ({ id, name }));
};

// --- Export All as Object ---
export default {
  CategoryContext,
  CategoryProvider,
  categoryTypes,
};
