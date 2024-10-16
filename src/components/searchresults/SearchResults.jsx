import React from 'react';
import Tracklist from '../tracklist/Tracklist';
import './SearchResults.css'; 

function SearchResults({searchResults, onAdd}) {
  
  console.log(searchResults.length);
  
  return (
    // React fragment Start
    <div className='SearchResults'>
      <h2>Results</h2>
      <Tracklist 
      searchResults = {searchResults}
      onAdd = {onAdd}
      onRemoval ={false}
      />
    </div>
    // React fragment end
  )
}

export default SearchResults