import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Toaster } from "./components/ui/sonner";
import { CategoryProvider } from "./contexts/CategoryContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/ProductContext";
import ScrollToTop from "./utils/ScrollToTop";
import { GlobalProvider } from "./contexts/GlobalContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CategoryProvider>
            <FavoritesProvider>
              <GlobalProvider>
                <ScrollToTop />
                <AppRoutes />
                <Toaster />
              </GlobalProvider>
            </FavoritesProvider>
          </CategoryProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
