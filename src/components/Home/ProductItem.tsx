import React from "react";
import { Product } from "./types";

interface ProductItemProps {
  item: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => (
  <div className="bg-white rounded-xl shadow-md p-4">
    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
      {item.images && item.images.length > 0 ? (
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <span className="text-4xl">🍽️</span>
      )}
    </div>
    <h4 className="font-semibold text-gray-800 mb-2">{item.name}</h4>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-blue-600">${item.price}</span>
        {item.oldPrice && (
          <span className="text-sm text-gray-500 line-through">
            ${item.oldPrice}
          </span>
        )}
        {item.discount && (
          <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
            -{item.discount}%
          </span>
        )}
      </div>
    </div>
  </div>
);

export default ProductItem;