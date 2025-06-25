import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import SearchSuggestions from "./SearchSuggestions";

const SearchBar: React.FC = () => {
  const [searchStr, setSearchStr] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalized =
      value.length > 0
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : "";
    setSearchStr(capitalized);
  };

  // Close suggestion panel on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition">
        <input
          type="text"
          placeholder="Search for products"
          value={searchStr}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          className="flex-grow bg-gray-100 outline-none text-gray-700 placeholder-gray-500 text-lg"
        />
        <button
          type="button"
          className="ml-2 p-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          <FiSearch className="text-xl text-gray-800" />
        </button>
      </div>

      {/* Show the suggestion component on focus */}
      {isFocused && <SearchSuggestions query={searchStr} setQuery={setSearchStr}/>}
    </div>
  );
};

export default SearchBar;
