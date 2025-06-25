import React from "react";
import RecentSearchList from "./Other/RecentSearches";
import PopularSearchList from "./Other/PopularSearchList";
import SearchSuggestionList from "./Other/SearchSuggestionList";

interface SearchSuggestionsProps {
  query: string;
  setQuery: (query: string) => void;
}

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

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  setQuery,
}) => {
  const trimmedQuery = query.trim();

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(trimmedQuery.toLowerCase())
  );

  return (
    <div className="absolute z-40 w-full mt-1 mb-4 bg-white border border-gray-200 rounded-xl shadow-lg py-4 px-6 space-y-4">
      {trimmedQuery === "" ? (
        <>
          <RecentSearchList
            searches={recentSearches}
            setQuery={setQuery}
            styleTitle={tabTitleStyles}
          />
          <PopularSearchList
            searches={popularSearches}
            onSelect={setQuery}
            styleTitle={tabTitleStyles}
          />
        </>
      ) : (
        <SearchSuggestionList
          suggestions={filteredSuggestions}
          onSelect={setQuery}
          styleTitle={tabTitleStyles}
        />
      )}
    </div>
  );
};

export default SearchSuggestions;
