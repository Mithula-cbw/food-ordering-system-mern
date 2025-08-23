import axios from "axios";
import { CartItem } from "../types";

const API_BASE = "http://localhost:4000/api/cart";

export const fetchCartFromDB = async (userId: string): Promise<CartItem[]> => {
  try {
    const response = await axios.get(`${API_BASE}?userId=${userId}`);
    return response?.data || [];
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
