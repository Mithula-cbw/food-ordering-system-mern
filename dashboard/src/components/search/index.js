import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const suggestionsList = [
  "Apple",
  "Banana",
  "Blueberry",
  "Cherry",
  "Grapes",
  "Orange",
  "Pineapple",
  "Strawberry",
  "Watermelon",
  // Add more items for testing
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = suggestionsList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="search position-relative d-flex align-items-center">
      <FaSearch className="mr-2" />
      <input
        type="text"
        placeholder="Search Here..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
