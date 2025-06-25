import React from "react";
import { Clock } from "lucide-react";

interface RecentSearchListProps {
  setQuery: (query: string) => void;
  className?: string;
  styleTitle?: string;
}

const recentSearches = ["Shoes", "Camera", "Wireless Mouse"];

const RecentSearchList: React.FC<RecentSearchListProps> = ({
  setQuery,
  className = "",
  styleTitle = "",
}) => {
  const handleClick = (item: string) => {
    setQuery(item);
  };

  const clearHistory = () => {
    alert("Clear history clicked! (Dummy function)");
  };

  return (
    <div className={className}>
      <div className={`${styleTitle} flex items-center justify-between`}>
        <div className="flex items-center text-sm font-semibold text-gray-400">
          Recent Searches
        </div>
        <button
          onClick={clearHistory}
          className="text-xs text-blue-500 hover:underline cursor-pointer"
        >
          Clear History
        </button>
      </div>

      <ul className="flex flex-wrap gap-2 list-none p-0 m-0 pb-2">
        {recentSearches.map((item, index) => (
          <li
            key={`recent-${index}`}
            className="flex items-center text-sm hover:underline cursor-pointer bg-gray-200 px-4 py-1 rounded-xl"
            onClick={() => handleClick(item)}
          >
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearchList;
