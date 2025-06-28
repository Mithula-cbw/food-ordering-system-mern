import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductsContextType } from "../types/index";

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVegan, setIsVegan] = useState<boolean>(() => {
    const saved = localStorage.getItem("isVegan");
    return saved === "true"; // default to false if not set
  });

  useEffect(() => {
    localStorage.setItem("isVegan", isVegan.toString());
  }, [isVegan]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply vegan filter
  const filteredProducts = isVegan
    ? products.filter((product) => product.type === "Vegetarian")
    : products;

  return (
    <ProductsContext.Provider
      value={{
        products: filteredProducts,
        loading,
        error,
        isVegan,
        setIsVegan,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};
