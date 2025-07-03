import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { CartProvider } from "./components/cart/CartContext.tsx";





createRoot(document.getElementById("root")!).render(
  <StrictMode>
   
      <CartProvider>
        <App />
      </CartProvider>
  
  </StrictMode>
);
