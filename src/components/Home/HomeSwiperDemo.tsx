import React, { useContext } from "react";
import CategoryModule, { Category } from "@/contexts/CategoryContext";
import HomeSwiper from "./HomeSwiper";
import { Product } from "../../types";
import { useProducts } from "../../contexts/ProductsContext";

const { CategoryContext } = CategoryModule;

const HomeSwiperDemo: React.FC = () => {
  const { categories } = useContext(CategoryContext);
  const { products} = useProducts();

  const tabCategories = [
    { name: "All", color: "#f4f4f4" },
    ...categories.map((cat: Category) => ({
      name:
        cat.name.split(" ")[0].charAt(0).toUpperCase() +
        cat.name.split(" ")[0].slice(1).toLowerCase(),
      color: cat.color,
    })),
  ];


  console.log("Products being passed to HomeSwiper:", products);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto">
        <HomeSwiper
          title="SPECIAL OFFERS"
          subtitle="Do not miss the current offers until the end of March"
          showTabs={true}
          categories={tabCategories}
          products={products}
          autoplay={true}
          autoplayDelay={5000}
          className="mb-8"
          headerClassName="bg-white rounded-lg p-4 shadow-sm"
          slidesPerView={5}
          spaceBetween={8}
        />
      </div>
    </div>
  );
};

export default HomeSwiperDemo;
