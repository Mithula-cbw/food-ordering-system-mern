import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const badgeStyle =
  "absolute top-[-6px] right-[-6px] bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center";

const WishlistIndicator: React.FC = () => {
  const wishlistCount = 2;

  return (
    <Link to="/mylist" className="relative bg-red-50 rounded-full p-4 hover:bg-red-100 transition-colors">
      <Heart className="text-red-500" />
      <span className={badgeStyle}>{wishlistCount}</span>
    </Link>
  );
};

export default WishlistIndicator;
