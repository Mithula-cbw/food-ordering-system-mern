import React from "react";
import { Product } from "../../types";
import { Link } from "react-router-dom";
// import { useFavorites } from "../../contexts/FavoritesContext";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
// import { useUser } from "../../contexts/UserContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const WishListItem: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
//   const { favorites } = useFavorites();
//   const { user } = useUser();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-app-main fill-app-main" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <Star className="w-5 h-5 text-gray-300 absolute" />
            <Star className="w-5 h-5 text-orange-400 fill-orange-400 absolute clip-half" />
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  const truncateDescription = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };


  const isInStock = product.countInStock.toLowerCase() === "in stock";

  return (
    <>
      <Link to={`/product/${product._id}`} className="block group">
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
        >
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-100 overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-400">🍽️</span>
              </div>
            )}

            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                  {product.discount}%
                </div>
              </div>
            )}

            {/* Overlay for out of stock */}
            {!isInStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-gray-900 font-semibold text-sm">
                    Out of Stock
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Title */}
            <h3 className="text-lg font-bold text-blue-600 mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-gray-800 text-sm mb-3 leading-relaxed line-clamp-2 font-medium">
              {truncateDescription(product.description)}
            </p>

            {/* Stock Status */}
            <div className="mb-3">
              <span className="text-green-600 text-sm font-semibold">
                {product.countInStock}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-2">
              {product.oldPrice && (
                <span className="text-gray-400 text-lg line-through">
                  ${product.oldPrice}
                </span>
              )}
              <span className="text-red-500 text-xl font-bold">
                ${product.price}
              </span>
            </div>
            <Button>
                
            </Button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default WishListItem;
