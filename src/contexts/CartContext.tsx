import { CartItem, Product, User } from "../types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useUser } from "./UserContext";
import {
  addItemToCart,
  fetchCartFromDB,
  removeItemFromCart,
  updateCartItemInDB, 
} from "../api/cart";

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
  const saveToLocal = (items: CartItem[]) =>
    localStorage.setItem("cart", JSON.stringify(items));

  const getFromLocal = (): CartItem[] => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  // Merge carts by productId+size
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

    const merged = mergeCarts(localCart, serverCart);

    // Push merged items into DB (add or update)
    for (const item of merged) {
      const existing = serverCart.find(
        (dbItem) =>
          dbItem.productId === item.productId && dbItem.size === item.size
      );

      if (existing) {
        // update quantity
        await updateCartItemInDB(existing.id!, {
          ...existing,
          quantity: item.quantity,
          subTotal: item.quantity * existing.price,
        });
      } else {
        await addItemToCart({ ...item, userId });
      }
    }

    
    const finalCart = await fetchCartFromDB(userId);
    setCartItems(finalCart);
    saveToLocal(finalCart);
  };

  // --- Cart functions ---
  const addToCart = async (
    product: Product,
    size: string,
    quantity: number = 1
  ) => {
    let newItem: CartItem | null = null;

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
        newItem = {
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

      return updated;
    });

    if (isLoggedIn && user?.id) {
      if (newItem) {
        const savedItem = await addItemToCart(newItem);
        if (savedItem) {
          // replace with real DB item (with _id)
          setCartItems((prev) =>
            prev.map((i) =>
              i.productId === savedItem.productId && i.size === savedItem.size
                ? savedItem
                : i
            )
          );
        }
      } else {
        // find updated item and push change
        const existing = cartItems.find(
          (i) => i.productId === product._id && i.size === size
        );
        if (existing?.id) {
          await updateCartItemInDB(existing.id, existing);
        }
      }
    }
  };

  const removeFromCart = async (productId: string, size: string) => {
    const itemToRemove = cartItems.find(
      (item) => item.productId === productId && item.size === size
    );

    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );

    if (isLoggedIn && itemToRemove?.id) {
      await removeItemFromCart(itemToRemove.id);
    }
  };

  const updateQuantity = async (
    productId: string,
    quantity: number,
    size: string
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity, subTotal: item.price * quantity }
          : item
      )
    );

    if (isLoggedIn) {
      const itemToUpdate = cartItems.find(
        (i) => i.productId === productId && i.size === size
      );
      if (itemToUpdate?.id) {
        await updateCartItemInDB(itemToUpdate.id, {
          ...itemToUpdate,
          quantity,
          subTotal: itemToUpdate.price * quantity,
        });
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (isLoggedIn && user?.id) {
      // optional: backend clear route
      for (const item of cartItems) {
        if (item.id) await removeItemFromCart(item.id);
      }
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
