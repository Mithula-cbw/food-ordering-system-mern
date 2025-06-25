import React from "react";
import { Clock} from "lucide-react";

interface SearchSuggestionsProps {
  query: string;
  setQuery?: (query: string) => void;
}

const recentSearches = ["Shoes", "Camera", "Wireless Mouse"];
const popularSearches = ["iPhone 15", "Smart Watch", "Air Fryer"];
const suggestions = [
  "iPhone Case",
  "iPhone Charger",
  "iPhone 15 Pro",
  "iPhone Screen Protector",
];

const tabTitleStyles =
  "text-sm font-semibold text-gray-400 mb-1 block border-b pb-2 mb-2 border-gray-400 flex items-center justify-between";

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  setQuery,
}) => {
  const trimmedQuery = query.trim();

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(trimmedQuery.toLowerCase())
  );

  // Dummy clear history function
  const clearHistory = () => {
    alert("Clear history clicked! (Dummy function)");
  };

  // if clicked on a recent search, set the query
  const handleRecentSearchClick = (item: string) => {
    if (setQuery) {
      setQuery(item);
    }
  };

  return (
    <div className="absolute z-10 w-full mt-1 mb-4 bg-white border border-gray-200 rounded-xl shadow-lg py-4 px-6 space-y-4">
      {trimmedQuery === "" ? (
        <>
          <div>
            <div className={tabTitleStyles}>
              <div className="flex items-center">
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
                  className="flex flex-row justify-between items-center text-sm hover:underline cursor-pointer bg-gray-200 px-4 py-1 rounded-xl"
                  onClick={handleRecentSearchClick.bind(null, item)}
                >
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={tabTitleStyles}>
              <div className="flex items-center">
                Popular Searches
              </div>
            </div>
            <ul className="text-gray-700 space-y-1 pb-2">
              {popularSearches.map((item, index) => (
                <li
                  key={`popular-${index}`}
                  className="hover:underline cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
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
