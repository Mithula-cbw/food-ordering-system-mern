import { CartItem, Product } from "../types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useUser } from "./UserContext";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, quantity: number, size: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, isLoggedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Load from localStorage if not logged in
  useEffect(() => {
    setLoading(true);
    if (!isLoggedIn) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
    setLoading(false);
  }, [isLoggedIn]);

  // Sync localStorage when not logged in
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product._id && item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === product._id && item.size === size
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subTotal: (item.quantity + quantity) * item.price,
              }
            : item
        );
      }

      const newItem: CartItem = {
        productTitle: product.name,
        images: product.images[0] || "",
        rating: product.rating,
        price: product.price,
        quantity,
        subTotal: product.price * quantity,
        productId: product._id,
        userId: isLoggedIn ? user?.id : undefined,
        size,
      };

      return [...prev, newItem];
    });
  };

 const removeFromCart = (productId: string, size: string) => {
  setCartItems((prev) =>
    prev.filter((item) => !(item.productId === productId && item.size === size))
  );
};


  const updateQuantity = (
    productId: string,
    quantity: number,
    size: string
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? {
              ...item,
              quantity,
              subTotal: item.price * quantity,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (!isLoggedIn) {
      localStorage.removeItem("cart");
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.subTotal, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
