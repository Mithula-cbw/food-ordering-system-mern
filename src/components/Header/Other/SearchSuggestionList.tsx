import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FiSearch } from "react-icons/fi";

interface SearchSuggestionListProps {
  trimmedQuery: string;
  onSelect: (item: string) => void;
  styleTitle?: string;
}

const suggestions = [
  "iPhone Case",
  "iPhone Charger",
  "iPhone 15 Pro",
  "iPhone Screen Protector",
];

const SearchSuggestionList: React.FC<SearchSuggestionListProps> = ({
  trimmedQuery,
  onSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const results = suggestions.filter((item) =>
        item.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      setFilteredSuggestions(results);
      setLoading(false);
    }, 1200); // simulate delay

    return () => clearTimeout(timeout);
  }, [trimmedQuery]);

  return (
    <div>
      {loading ? (
        <ul className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div className="flex flex-row items-center gap-3" key={i}>
              <Skeleton key={i} className="h-8 w-8 rounded-xl" />
              <Skeleton key={i} className="h-8 w-3/4 rounded-xl" />
            </div>
          ))}
        </ul>
      ) : filteredSuggestions.length > 0 ? (
        <ul className="text-gray-700 space-y-3 pb-3 pt-1">
          {filteredSuggestions.map((item, index) => (
            <li
              key={`suggestion-${index}`}
              className="text-gray-700 hover:underline cursor-pointer text-sm flex flex-row justify-start items-center gap-x-3"
              onClick={() => onSelect(item)}
            >
              <FiSearch size={18} />
              <span className="text-[18px]">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">No results found.</p>
      )}
    </div>
  );
};

export default SearchSuggestionList;
