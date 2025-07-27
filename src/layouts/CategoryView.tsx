import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CategorySidebar from "../components/Category/CategorySidebar";
import ProductList from "../components/Category/ProductList";
import GridControl from "../components/Category/GridControl";
import { useProductContext } from "../contexts/ProductContext";
import Header from "@/components/Header/Header";

const CategoryView = () => {
  const { id } = useParams(); 
  const [viewMode, setViewMode] = useState("grid");

  const { products } = useProductContext();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  useEffect(() => {
    if (id) {
      setSelectedCategories([id]);
    }
  }, []); 

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [selectedCategories]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((cat) => cat !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return products;
    return products.filter((product) =>
      selectedCategories.includes(product.category.id)
    );
  }, [products, selectedCategories]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavbar={false}/>
      <div className="flex">
        <CategorySidebar
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
        />
        <div className="flex-1">
          <div className="p-6">
            <GridControl viewMode={viewMode} setViewMode={setViewMode} />
            <ProductList products={filteredProducts} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
