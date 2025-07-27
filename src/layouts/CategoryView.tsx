import React, { useContext, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid3X3, List, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/Home/ProductItem";
import CategoryModule from "../contexts/CategoryContext";
import { useProductContext } from "../contexts/ProductContext";

const { CategoryContext } = CategoryModule;

const CategoryView = () => {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const { categories } = useContext(CategoryContext);
  const { products } = useProductContext();

  const currentProducts = useMemo(() => {
    if (!products || !id) return [];
    return products.filter((product) => product.category.id === id);
  }, [products, id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg p-6 min-h-screen">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              PRODUCT CATEGORIES
            </h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className={`flex items-center space-x-3 cursor-pointer ${
                    id === category.id
                      ? "font-bold text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  <span className="capitalize">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid2")}
                  className={`p-2 rounded ${
                    viewMode === "grid2"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>

              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <option>Filter By Rating</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
              </select>
            </div>

            {/* Animated Product Grid/List */}
            <motion.div
              key={viewMode}
              layout
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 1 }}
              className={`
    ${
      viewMode === "grid"
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        : ""
    }
    ${
      viewMode === "grid2"
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : ""
    }
    ${viewMode === "list" ? "flex flex-col space-y-4" : ""}
  `}
            >
              <AnimatePresence>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0.8, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.8, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard
                        product={product}
                        className={viewMode === "list" ? "flex flex-row" : ""}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className={`text-center py-12 ${
                      viewMode === "list" ? "w-full" : "col-span-full"
                    }`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-gray-500 text-lg">
                      No products available in this category
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Try selecting a different category
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
