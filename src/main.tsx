import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Toaster } from "./components/ui/sonner";
import { CategoryProvider } from "./contexts/CategoryContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ProductsProvider } from "./contexts/ProductsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <ProductsProvider>
        <FavoritesProvider>
          <AppRoutes />
          <Toaster />
        </FavoritesProvider>
        </ProductsProvider>
      </CategoryProvider>
    </BrowserRouter>
  </StrictMode>
);
