import React from "react";

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
        Popular Searches
      </div>
      <ul className="text-gray-700 space-y-1 pb-2 mt-2">
        {searches.map((item, index) => (
          <li
            key={`popular-${index}`}
            className="flex flex-row justify-start items-center gap-x-2 hover:underline cursor-pointer text-sm"
            onClick={() => onSelect?.(item)}
          >
            <span className="text-gray-500 font-semibold text-lg">#</span>
            <span className="text-gray-600 hover:text-gray-800">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularSearchList;
