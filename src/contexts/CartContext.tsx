import { CartItem, Product, User } from "../types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useUser } from "./UserContext";
import { fetchCartFromDB, updateCartInDB } from "../api/cart";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, quantity: number, size: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  syncCartOnLogin: (user: User) => Promise<void>;
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

  // --- Helpers ---
  const saveToLocal = (items: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const getFromLocal = (): CartItem[] => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const mergeCarts = (local: CartItem[], server: CartItem[]): CartItem[] => {
    const map = new Map<string, CartItem>();
    [...local, ...server].forEach((item) => {
      const key = `${item.productId}_${item.size}`;
      if (map.has(key)) {
        const existing = map.get(key)!;
        existing.quantity += item.quantity;
        existing.subTotal = existing.quantity * existing.price;
      } else {
        map.set(key, { ...item });
      }
    });
    return Array.from(map.values());
  };

  // --- Load local cart on mount if not logged in ---
  useEffect(() => {
    setLoading(true);
    if (!isLoggedIn) {
      setCartItems(getFromLocal());
    }
    setLoading(false);
  }, [isLoggedIn]);

  // --- Persist to localStorage when guest ---
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      saveToLocal(cartItems);
    }
  }, [cartItems, isLoggedIn, loading]);

  // --- Sync and auto-merge on login ---
  const syncCartOnLogin = async (currentUser: User) => {
    const userId = currentUser.id;
    const localCart = getFromLocal();
    const serverCart = await fetchCartFromDB(userId);

    let finalCart: CartItem[] = [];

    if (localCart.length && serverCart.length) {
      finalCart = mergeCarts(localCart, serverCart);
    } else if (localCart.length) {
      finalCart = localCart;
    } else {
      finalCart = serverCart;
    }

    setCartItems(finalCart);
    saveToLocal(finalCart);
    await updateCartInDB(userId, finalCart);
  };

  // --- Cart functions ---
  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product._id && item.size === size
      );

      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.productId === product._id && item.size === size
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subTotal: (item.quantity + quantity) * item.price,
              }
            : item
        );
      } else {
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
        updated = [...prev, newItem];
      }

      if (isLoggedIn && user?.id) {
        updateCartInDB(user.id, updated);
      }
      return updated;
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prev) => {
      const updated = prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
      if (isLoggedIn && user?.id) {
        updateCartInDB(user.id, updated);
      }
      return updated;
    });
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    size: string
  ) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.productId === productId && item.size === size
          ? {
              ...item,
              quantity,
              subTotal: item.price * quantity,
            }
          : item
      );
      if (isLoggedIn && user?.id) {
        updateCartInDB(user.id, updated);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (isLoggedIn && user?.id) {
      updateCartInDB(user.id, []);
    } else {
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
        syncCartOnLogin,
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
