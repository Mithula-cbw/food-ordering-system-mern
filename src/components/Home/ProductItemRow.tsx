import React, { useEffect, useState } from "react";
import { Star, Heart, Maximize2, CheckCircle } from "lucide-react";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import { toast } from "sonner";
import { useUser } from "../../contexts/UserContext";
import { deleteData, postData } from "../../utils/Api";
import ProductZoom from "./ProductZoom";

interface ProductCardRowProps {
  product: Product;
  className?: string;
}

const ProductCardRow: React.FC<ProductCardRowProps> = ({
  product,
  className = "",
}) => {
  const { favorites, refreshFavorites } = useFavorites();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

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

  const removeItem = async (id: string) => {
    try {
      await deleteData(`/api/myList/${id}`);
      toast.success("Item removed from wishlist!");
      refreshFavorites();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to remove item. Please try again!");
    }
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      removeItem(product._id);
    } else {
      const data = {
        productTitle: product.name,
        images: product.images[0],
        rating: Number(product.rating),
        price: product.price,
        productId: product._id,
        userId: user?.id,
      };

      try {
        const response = await postData("/api/myList/add/", data);

        if (response) {
          toast.success(
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-black font-semibold">
                Item added to wishlist!
              </span>
            </div>
          );
          refreshFavorites();
        } else {
          toast.error("Failed to add to wishlist.");
        }
      } catch (err) {
        console.error("Wishlist error:", err);
        toast.error("An error occurred.");
      }
    }
  };

  const isInStock = product.countInStock.toLowerCase() === "in stock";
  useEffect(() => {
    const found = favorites.some((fav) => fav.productId === product._id);
    setIsInWishlist(found);
  }, [favorites, product._id]);

  return (
    <>
      <Link
        to={`/product/${product._id}`}
        className={`block group ${className}`}
      >
        <div className="flex flex-row bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-[120px] relative">
          {/* Image Section */}
          <div className="relative w-[120px] h-full bg-gray-100 overflow-hidden flex-shrink-0">
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

            {isOpen && (
              <ProductZoom
                isInWishlist={isInWishlist}
                product={product}
                onClose={() => setIsOpen(false)}
              />
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
          <div className="flex flex-row justify-between flex-1 p-4">
            <div className="flex flex-col justify-between h-full">
              {/* Title */}
              <div className="flex flex-col h-full justify-start">
                <h3 className="text-lg font-bold text-blue-600 mb-1 line-clamp-1 group-hover:text-blue-500 transition-colors">
                  {product.name}
                </h3>
                {/* Description */}
                <p className="text-gray-800 text-sm mb-1 leading-relaxed line-clamp-3 font-medium">
                  {truncateDescription(product.description)}
                </p>
              </div>
              {/* Rating and Stock */}
              <div className="flex items-center justify-start space-x-6 mb-2">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span
                className={`text-sm font-semibold ${
                  isInStock ? "text-green-600" : "text-orange-600"
                }`}
              >
                {product.countInStock}
              </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-2">
              {/* Price and Wishlist */}
              <div className="flex flex-col h-full items-end justify-between pr-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsOpen(true);
                    }}
                    className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-transform duration-200 hover:scale-110"
                    title="View Product"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={handleWishlistClick}
                    className={`w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center shadow transition-transform duration-200 hover:scale-110 ${
                      isInWishlist
                        ? "bg-white hover:bg-red-50"
                        : "bg-white/90 hover:bg-white"
                    }`}
                    title={
                      isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                    }
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist
                          ? "text-white fill-red-500"
                          : "text-gray-700 hover:text-red-500"
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {product.oldPrice && (
                      <span className="text-gray-400 text-lg line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                    <span className="text-green-700 text-xl font-bold">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCardRow;
