import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { HomeSwiperProps } from './types';
import ProductItem from './ProductItem';
import NoProductsFound from './NoProductsFound';
import Tab from './Tab';
import { Swiper, SwiperSlide } from './Swiper';

const HomeSwiper: React.FC<HomeSwiperProps> = ({
  title,
  subtitle,
  showViewAllButton = false,
  onViewAllClick,
  showTabs = false,
  categories = [],
  products = [],
  slidesPerView = 4,
  spaceBetween = 12,
  autoplay = false,
  showDoubleRow = false,
  itemsPerRow = 6,
  className = "",
  headerClassName = "",
  swiperClassName = ""
}) => {
    console.log("Received products in HomeSwiper:", products);

  const [activeTab, setActiveTab] = useState(0);

  const getFilteredProducts = () => {
    console.log('Filtering products for active tab:', products);
    if (!showTabs || categories.length === 0) return products;
    const activeCategory = categories[activeTab];
    if (activeCategory.name.toLowerCase() === 'all') return products;
    return products.filter(item =>
      item.category?.name?.toLowerCase() === activeCategory.name?.toLowerCase()
    );
  };

  const filteredProducts = getFilteredProducts();

  const renderProducts = () => {
    if (filteredProducts.length === 0) return <NoProductsFound />;

    if (showDoubleRow) {
      const rows = Math.ceil(filteredProducts.length / itemsPerRow);
      const chunks = Array.from({ length: rows }, (_, i) =>
        filteredProducts.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
      );

      return chunks.map((chunk, rowIdx) => (
        <div className={`w-full mt-4 ${swiperClassName}`} key={rowIdx}>
          <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} autoplay={autoplay}>
            {chunk.map((item, idx) => (
              <SwiperSlide key={idx}>
                <ProductItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ));
    }

    return (
      <div className={`w-full mt-4 ${swiperClassName}`}>
        <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} autoplay={autoplay}>
          {filteredProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex items-center mt-3 ${headerClassName}`}>
        <div className="flex-grow">
          {title && <h3 className="mb-0 text-2xl font-bold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-gray-600 text-sm mb-0">{subtitle}</p>}
        </div>

        <div className="ml-auto flex items-center">
          {showTabs && categories.length > 0 ? (
            <div className="bg-white p-2 rounded-lg shadow-sm max-w-md overflow-x-auto">
              <div className="flex space-x-1 min-w-max">
                {categories.map((category, index) => (
                  <Tab
                    key={index}
                    label={category.name}
                    isActive={activeTab === index}
                    onClick={() => setActiveTab(index)}
                  />
                ))}
              </div>
            </div>
          ) : (
            showViewAllButton && (
              <button
                onClick={onViewAllClick}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View All <IoIosArrowRoundForward className="ml-2 text-xl" />
              </button>
            )
          )}
        </div>
      </div>
      {renderProducts()}
    </div>
  );
};

export default HomeSwiper;