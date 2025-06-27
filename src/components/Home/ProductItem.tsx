import React from 'react';
import { Product } from './types';

interface ProductItemProps {
  item: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => (
  <div className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    {item.discount && (
      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
        {item.discount}%
      </div>
    )}
    <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
      <span className="text-gray-500">{item.name}</span>
    </div>
    <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
    <p className="text-gray-600 text-xs mb-2">{item.category?.name}</p>
    <div className="flex justify-between items-center">
      <span className="font-bold text-green-600">${item.price}</span>
      <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
        Add
      </button>
    </div>
  </div>
);

export default ProductItem;