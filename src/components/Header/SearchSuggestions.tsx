import React from "react";
import RecentSearchList from "./Other/RecentSearches";
import PopularSearchList from "./Other/PopularSearchList";

interface SearchSuggestionsProps {
  query: string;
  setQuery: (query: string) => void;
}

// Sample data for recent and popular searches
const recentSearches = ["Shoes", "Camera", "Wireless Mouse", "laptop", "burger bun 6#"];
const popularSearches = ["iPhone 15", "Smart Watch", "Air Fryer"];
const suggestions = [
  "iPhone Case",
  "iPhone Charger",
  "iPhone 15 Pro",
  "iPhone Screen Protector",
];


const tabTitleStyles =
  "text-sm font-semibold text-gray-400 mb-1 block border-b pb-2 mb-2 border-gray-400";

//default export for SearchSuggestions component
const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  setQuery,
}) => {
  const trimmedQuery = query.trim();

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(trimmedQuery.toLowerCase())
  );

  return (
    <div className="absolute z-10 w-full mt-1 mb-4 bg-white border border-gray-200 rounded-xl shadow-lg py-4 px-6 space-y-4">
      {trimmedQuery === "" ? (
        <>
          <RecentSearchList
            searches={recentSearches}
            setQuery={setQuery} 
            styleTitle={tabTitleStyles} />
          <PopularSearchList
            searches={popularSearches}
            onSelect={setQuery}
            styleTitle={tabTitleStyles}
          />
        </>
      ) : (
        <div>
          <div className={tabTitleStyles}>
            <div className="flex items-center">Suggestions</div>
          </div>
          {filteredSuggestions.length > 0 ? (
            <ul className="text-gray-700 space-y-1">
              {filteredSuggestions.map((item, index) => (
                <li
                  key={`suggestion-${index}`}
                  className="hover:underline cursor-pointer text-sm"
                  onClick={() => setQuery(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
