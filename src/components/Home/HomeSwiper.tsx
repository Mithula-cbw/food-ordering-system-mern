import React, { useState } from "react";
import { HomeSwiperProps } from "./types";
import Tab from "./Tab";
import ProductItem from "./ProductItem";
import NoProductsFound from "./NoProductsFound";
import SimpleSwiper from "./SimpleSwiper";

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
  autoplayDelay = 3000,
  showDoubleRow = false,
  itemsPerRow = 6,
  className = "",
  headerClassName = "",
  swiperClassName = "",
}) => {
  console.log("Received products in HomeSwiper:", products);
  const [activeTab, setActiveTab] = useState(0);

  const getFilteredProducts = () => {
    console.log("Filtering products for active tab:", products);
    
    if (!showTabs || categories.length === 0) return products;

    const activeCategory = categories[activeTab];
    console.log("Active tab index:", activeCategory.name.toLowerCase());
    if (activeCategory.name.toLowerCase() === "all") return products;

    return products.filter(
      (item) =>
        item.category?.name?.toLowerCase() ===
        activeCategory.name?.toLowerCase()
    );
  };

  const filteredProducts = getFilteredProducts();
  console.log("Filtered products:", filteredProducts);

  const renderProducts = () => {
    if (filteredProducts.length === 0) return <NoProductsFound />;

    if (showDoubleRow) {
      const rows = Math.ceil(filteredProducts.length / itemsPerRow);
      const chunks = Array.from({ length: rows }, (_, i) =>
        filteredProducts.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
      );

      return chunks.map((chunk, rowIdx) => (
        <div className={`w-full mt-4 ${swiperClassName}`} key={rowIdx}>
          <SimpleSwiper
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            autoplay={autoplay}
            autoplayDelay={autoplayDelay}
          >
            {chunk.map((item, idx) => (
              <div key={idx}>
                <ProductItem item={item} />
              </div>
            ))}
          </SimpleSwiper>
        </div>
      ));
    }

    return (
      <div className={`w-full mt-4 ${swiperClassName}`}>
        <SimpleSwiper
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          autoplay={autoplay}
          autoplayDelay={autoplayDelay}
        >
          {filteredProducts.map((item, index) => (
            <div key={index}>
              <ProductItem item={item} />
            </div>
          ))}
        </SimpleSwiper>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex items-center mt-3 ${headerClassName}`}>
        <div className="flex-grow">
          {title && (
            <h3 className="mb-0 text-2xl font-bold text-gray-800">{title}</h3>
          )}
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
                View All →
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
