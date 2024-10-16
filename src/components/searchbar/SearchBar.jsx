import React from 'react'
import "./SearchBar.css"
function SearchBar({onSearch}) {

  function handleSearchChange(event){
    // Call a function to render the search 
    onSearch(event.target.value);
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleSearchChange} />
      <button className="SearchButton">SEARCH</button>
    </div>
  )
}

export default SearchBar