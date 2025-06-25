import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const badgeStyle =
  "absolute top-[-6px] right-[-6px] bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center";

const CartLink: React.FC = () => {
  const cartCount = 3;

  return (
    <Link to="/cart" className="relative bg-red-50 rounded-full p-4 hover:bg-red-100 transition-colors">
      <ShoppingCart className="text-red-500" />
      <span className={badgeStyle}>{cartCount}</span>
    </Link>
  );
};

export default CartLink;