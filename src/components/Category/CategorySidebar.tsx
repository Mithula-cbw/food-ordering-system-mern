// CategorySidebar.tsx
import React, { useContext } from "react";
import CategoryModule from "../../contexts/CategoryContext";

const { CategoryContext } = CategoryModule;

type Props = {
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
};

const CategorySidebar: React.FC<Props> = ({
  selectedCategories,
  toggleCategory,
}) => {
  const { categories } = useContext(CategoryContext);

  return (
    <div className="w-80 bg-white shadow-lg p-6 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        PRODUCT CATEGORIES
      </h2>
      <div className="space-y-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <div
              key={category.id}
              className={`flex items-center space-x-3 cursor-pointer ${
                isSelected ? "font-normal text-header-catbtn/75" : "text-gray-500"
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              <input
                type="checkbox"
                checked={isSelected}
                readOnly
                className="accent-header-catbtn"
              />
              <span className="capitalize">{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
