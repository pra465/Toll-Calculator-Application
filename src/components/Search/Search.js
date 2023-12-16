import React from 'react';
import './Search.css';
const Search = () => {
  return (
    <div id="searchContainer">
      <input
        type="text"
        placeholder="Search for nearby places..."
        id="searchInputBox"
      />
      <button id="nearbyPlaceSearchBtn">Search</button>
    </div>
  );
};

export default Search;
