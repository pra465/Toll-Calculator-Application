import React, { useState } from 'react';
import './Search.css';
import { useDispatch } from 'react-redux';
import { searchLocation } from '../../features/overpassDataSlice';
const Search = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const handleClick = () => {
    dispatch(searchLocation(searchText));
  };
  return (
    <div id="searchContainer">
      <input
        type="text"
        placeholder="Search for nearby places..."
        id="searchInputBox"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button id="nearbyPlaceSearchBtn" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default Search;
