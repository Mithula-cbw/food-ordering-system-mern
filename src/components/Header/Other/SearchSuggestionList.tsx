import React from "react";

interface SearchSuggestionListProps {
  suggestions: string[];
  onSelect: (item: string) => void;
  styleTitle?: string;
}

const SearchSuggestionList: React.FC<SearchSuggestionListProps> = ({
  suggestions,
  onSelect,
  styleTitle = "",
}) => {
  return (
    <div>
      <div className={styleTitle}>
        <div className="flex items-center">Suggestions</div>
      </div>
      {suggestions.length > 0 ? (
        <ul className="text-gray-700 space-y-1">
          {suggestions.map((item, index) => (
            <li
              key={`suggestion-${index}`}
              className="hover:underline cursor-pointer text-sm"
              onClick={() => onSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No results found.</p>
      )}
    </div>
  );
};

export default SearchSuggestionList;
