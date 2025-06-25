import React from "react";
import { Star } from "lucide-react";

interface PopularSearchListProps {
  searches: string[];
  onSelect?: (query: string) => void;
  styleTitle?: string;
}

const PopularSearchList: React.FC<PopularSearchListProps> = ({
  searches,
  onSelect,
  styleTitle = "",
}) => {
  return (
    <div>
      <div className={`${styleTitle} flex items-center`}>
        <Star className="w-4 h-4 mr-2 text-gray-400" />
        Popular Searches
      </div>
      <ul className="text-gray-700 space-y-1 pb-2 mt-2">
        {searches.map((item, index) => (
          <li
            key={`popular-${index}`}
            className="hover:underline cursor-pointer text-sm"
            onClick={() => onSelect?.(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularSearchList;
