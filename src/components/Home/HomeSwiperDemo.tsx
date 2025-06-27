import React from 'react';
import HomeSwiper from './HomeSwiper';
import { Category, Product } from './types';

const HomeSwiperDemo: React.FC = () => {
  const categories: Category[] = [
    { name: 'All' },
    { name: 'Pizza' },
    { name: 'Burger' },
    { name: 'Drinks' },
    { name: 'Desserts' }
  ];

  const specialOfferProducts: Product[] = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, discount: 10, category: { name: 'Pizza' } },
    { id: 2, name: 'Cheeseburger', price: 8.99, discount: 12, category: { name: 'Burger' } },
    { id: 3, name: 'Coca Cola', price: 2.99, discount: 5, category: { name: 'Drinks' } },
    { id: 4, name: 'Chocolate Cake', price: 5.99, discount: 8, category: { name: 'Desserts' } },
    { id: 5, name: 'Pepperoni Pizza', price: 14.99, discount: 15, category: { name: 'Pizza' } },
    { id: 6, name: 'Chicken Burger', price: 10.99, category: { name: 'Burger' } }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <HomeSwiper
          title="SPECIAL OFFERS"
          subtitle="Do not miss the current offers until the end of March"
          showTabs={true}
          categories={categories}
          products={specialOfferProducts}
          autoplay={true}
          className="mb-8"
          headerClassName="bg-white rounded-lg p-4 shadow-sm"
        />
      </div>
    </div>
  );
};

export default HomeSwiperDemo;