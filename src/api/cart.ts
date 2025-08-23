import axios from "axios";
import { CartItem } from "../types";

const API_BASE = "/api/cart";

export const fetchCartFromDB = async (userId: string): Promise<CartItem[]> => {
  try {
    const response = await axios.get(`${API_BASE}?userId=${userId}`);
    return response.data?.cart || [];
  } catch (err) {
    console.error("Error fetching cart from DB:", err);
    return [];
  }
};

export const updateCartInDB = async (
  userId: string,
  cartItems: CartItem[]
): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_BASE}/update`, {
      userId,
      cart: cartItems,
    });
    return response.status === 200;
  } catch (err) {
    console.error("Error updating cart in DB:", err);
    return false;
  }
};
