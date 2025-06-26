import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Toaster } from "@/components/ui/toaster";
import { CategoryProvider } from "./contexts/CategoryContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <AppRoutes />
        <Toaster />
      </CategoryProvider>
    </BrowserRouter>
  </StrictMode>
);
