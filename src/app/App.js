import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import { Spotify } from '../utils/Spotify.js';

function App() {

  //Data management via state management, useState() hook, useState imported 
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("My New Playlist");


  //Browser side effect hook called useEffect hook
  // On document load, 
  useEffect(() => {
    Spotify.getAccessToken();
 
      // populate searchResults in the useEffect() hook

      setSearchResults([
        {
          id: 1,
          name: "Track 1",
          artist: "Track 1 Artist",
          album: "Track 1 Album",
          uri: "Track 1 Uri"
        },
        {
          id: 2,
          name: "Track 2",
          artist: "Track 2 Artist",
          album: "Track 2 Album",
          uri: "Track 2 Uri"
        },
        {
          id: 3,
          name: "Track 3",
          artist: "Track 3 Artist",
          album: "Track 3 Album",
          uri: "Track 3 Uri"
        },
      ]);

     // populate playListTracks in the useEffect() hook

      setPlayListTracks([
        {
          id: 4,
          name: "Playlist 1",
          artist: "Playlist 1 Artist",
          album: "Playlist 1 Album",
          uri: "Playlist 1 Uri"
        },
        {
          id: 5,
          name: "Playlist 2",
          artist: "Playlist 2 Artist",
          album: "Playlist 2 Album",
          uri: "Playlist 2 Uri"
        },
      ]);  

  }, []); //The blank bracket refers to running this hook only once 
  
  // Passed as a property to SearchBar
  function search(term){
    Spotify.search(term).then((response) => {
      setSearchResults(response);
    });
  }

  // Passed as a property to SearchResults
  function addTrack(track){
    const trackExists = playListTracks.find((currentTrack) => currentTrack.id === track.id);

    if(!trackExists)
    setPlayListTracks([...playListTracks, track]);

  }

  function removeTrack(track){
    //return all the tracks except the track passed in (filter tracks)
    const filteredTrack = playListTracks.filter((currentTrack) => currentTrack.id !== track.id);
    setPlayListTracks(filteredTrack);
  }

  // Passed as a prop (updatePlayListName)

  function updatePlayListName(strName){
    setPlayListName(strName);
  }

  //Function passed as a prop to save playlist 

  function savePlayList(){
    const tracksUri = playListTracks.map((track)=> track.uri);
    Spotify.savePlayList(playListName, tracksUri).then(() => {
      updatePlayListName("My New PlayList");
      setPlayListTracks([]);
    })
  }

  console.log("my searchResults", searchResults);
  console.log("my playListTracks", playListTracks);
  console.log("my playListName", playListName)
  
  return (
    <div>
      <h1>Your Music Ja<span className="highlight">mmm</span>s</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch = {search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults
           searchResults = {searchResults}
           onAdd = {addTrack} 
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist 
          playListTracks={playListTracks} 
          onRemove = {removeTrack}
          playListName ={playListName}
          updateName = {updatePlayListName}
          onSave = {savePlayList}
          />
        </div>
      </div>
      <h1>Made with the power of fruit <span className="highlight">Jam</span>sss</h1>
    </div>
  );
}

export default App;
