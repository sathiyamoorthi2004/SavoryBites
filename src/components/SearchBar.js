import React from "react";
import "./SearchBar.css"; // Import the CSS file

const SearchBar = ({ searchTerm, setSearchTerm, category, setCategory }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="search-dropdown">
        <option value="all">All</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="dessert">Dessert</option>
      </select>
    </div>
  );
};

export default SearchBar;