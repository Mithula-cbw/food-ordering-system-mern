import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FiSearch } from "react-icons/fi";
import NoResultsSuggestions from "./NoResultsSuggestions";
import { useProductContext } from "../../../contexts/ProductContext";
import CategoryModule from "../../../contexts/CategoryContext";

interface SearchSuggestionListProps {
  trimmedQuery: string;
  onSelect: (item: string) => void;
  styleTitle?: string;
}

const { CategoryContext } = CategoryModule;

const SearchSuggestionList: React.FC<SearchSuggestionListProps> = ({
  trimmedQuery,
  onSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [filteredCategorySuggestions, setFilteredCategorySuggestions] = useState<string[]>([]);
  const [filteredProductSuggestions, setFilteredProductSuggestions] = useState<string[]>([]);

  const { products } = useProductContext();
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const productSuggestions = products
        .map((product) => product.name)
        .filter((name) =>
          name.toLowerCase().includes(trimmedQuery.toLowerCase())
        );

      const usedCategoryIds = new Set(products.map((p) => p.category));
      const categorySuggestions = categories
        .filter(
          (cat) =>
            usedCategoryIds.has(cat) &&
            cat.name.toLowerCase().includes(trimmedQuery.toLowerCase())
        )
        .map((cat) => cat.name);

      setFilteredProductSuggestions(productSuggestions);
      setFilteredCategorySuggestions(categorySuggestions);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [trimmedQuery, products, categories]);

  return (
    <div>
      {loading ? (
        <ul className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div className="flex flex-row items-center gap-3" key={i}>
              <Skeleton className="h-8 w-8 rounded-xl" />
              <Skeleton className="h-8 w-3/4 rounded-xl" />
            </div>
          ))}
        </ul>
      ) : filteredCategorySuggestions.length > 0 || filteredProductSuggestions.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredProductSuggestions.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 mb-1">Products</div>
              <ul className="space-y-3">
                {filteredProductSuggestions.map((item, index) => (
                  <li
                    key={`product-${index}`}
                    className="text-gray-700 hover:underline cursor-pointer text-sm flex flex-row items-center gap-x-3"
                    onClick={() => onSelect(item)}
                  >
                    <FiSearch size={18} />
                    <span className="text-[16px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {filteredCategorySuggestions.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 mb-1">Categories</div>
              <ul className="space-y-3">
                {filteredCategorySuggestions.map((item, index) => (
                  <li
                    key={`category-${index}`}
                    className="text-gray-700 hover:underline cursor-pointer text-sm flex flex-row items-center gap-x-3"
                    onClick={() => onSelect(item)}
                  >
                    <FiSearch size={18} />
                    <span className="text-[16px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <NoResultsSuggestions />
      )}
    </div>
  );
};

export default SearchSuggestionList;
