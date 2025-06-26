import React, { useContext, useEffect } from "react";
import CategoryModule from "../../contexts/CategoryContext";

const { CategoryContext, categoryTypes } = CategoryModule;

const TestComponent = () => {
  const { categories, loading } = useContext(CategoryContext);

  useEffect(() => {
    if (!loading) {
      const types = categoryTypes(categories);
      console.log("Category Types:", types);
    }
  }, [categories, loading]);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return <div className="h-[900px]">Check your console for category types</div>;
};

export default TestComponent;
