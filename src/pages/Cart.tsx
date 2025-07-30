import React from "react";
import { useCart } from "../contexts/CartContext";


export default function Cart() {
  const { cartTotal } = useCart();

  return (
    <div className="p-6 space-y-6 text-black">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <div>{cartTotal}</div>
    </div>
  );
}
