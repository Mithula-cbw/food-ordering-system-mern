import React, { useEffect, useState } from "react";
import { Star, Heart, Maximize2, X, CheckCircle } from "lucide-react";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import { toast } from "sonner";
import { useUser } from "../../contexts/UserContext";
import { deleteData, postData } from "../../utils/Api";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { favorites, refreshFavorites } = useFavorites();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { user } = useUser();

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
        refreshFavorites()
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

  const handleZoomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsZoomed(true);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  const isInStock = product.countInStock.toLowerCase() === "in stock";
  useEffect(() => {
  const found = favorites.some((fav) => fav.productId === product._id);
  setIsInWishlist(found);
}, [favorites, product._id]);

  return (
    <>
      <Link to={`/product/${product._id}`} className="block group">
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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

            {/* Hover Action Buttons */}
            {isHovered && (
              <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                <button
                  onClick={handleZoomClick}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                  title="View Product"
                >
                  <Maximize2 className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleWishlistClick}
                  className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 ${
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
          </div>
        </div>
      </Link>

      {/* Product Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Zoomed Image */}
            <div className="aspect-square bg-gray-100">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl text-gray-400">🍽️</span>
                </div>
              )}
            </div>

            {/* Product Info in Modal */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-800 mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-green-600 text-sm font-semibold ml-4">
                    {product.countInStock}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.oldPrice && (
                    <span className="text-gray-400 text-lg line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                  <span className="text-red-500 text-2xl font-bold">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
