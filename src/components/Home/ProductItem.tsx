import React from "react";
import { Star } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  className?: string;
}



const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const truncateDescription = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Image Section */}
      <div className="relative">
        <div className="square bg-gray-100 flex items-center justify-center overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl text-gray-400">🍽️</span>
            </div>
          )}
        </div>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3">
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {product.discount}%
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-blue-500 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          {truncateDescription(product.description)}
        </p>

        {/* Stock Status */}
        <div className="mb-3">
          <span className="text-green-500 text-sm font-medium">
            {product.countInStock}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center">
          {product.oldPrice && (
            <span className="text-gray-400 text-lg line-through mr-2">
              ${product.oldPrice}
            </span>
          )}
          <span className="text-red-500 text-xl font-bold">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;