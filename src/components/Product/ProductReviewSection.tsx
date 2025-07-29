import React from "react";
import { Product } from "../../types";
import DescriptionTab from "./DescriptionTab";
import IngredientsAllergensTab from "./IngredientsAllergensTab";
import ReviewsTab from "./ReviewsTab";

interface ProductReviewSectionProps {
  product: Product;
  ingredients?: string[];
  allergens?: string[];
  reviewCount?: number;
}

const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({
  product,
  ingredients = [],
  allergens = [],
  reviewCount = 0,
}) => {
  const [activeTab, setActiveTab] = React.useState<
    "description" | "ingredients" | "reviews"
  >("description");

  const TabButton: React.FC<{
    tabKey: "description" | "ingredients" | "reviews";
    children: React.ReactNode;
    isActive: boolean;
  }> = ({ tabKey, children, isActive }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-green-500 text-white shadow-md"
          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 bg-app-bannerbtnhover/15">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Product Details {product.name}
        </h2>

        <div className="flex flex-wrap gap-3 mb-6">
          <TabButton tabKey="description" isActive={activeTab === "description"}>
            Description
          </TabButton>
          <TabButton tabKey="ingredients" isActive={activeTab === "ingredients"}>
            Ingredients & Allergens
          </TabButton>
          <TabButton tabKey="reviews" isActive={activeTab === "reviews"}>
            Reviews ({reviewCount})
          </TabButton>
        </div>

        {activeTab === "description" && <DescriptionTab description={product.description} />}
        {activeTab === "ingredients" && (
          <IngredientsAllergensTab ingredients={ingredients} allergens={allergens} />
        )}
        {activeTab === "reviews" && <ReviewsTab />}
      </div>
    </div>
  );
};

export default ProductReviewSection;
