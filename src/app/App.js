import './App.css';
import React, { useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import { Spotify } from '../utils/Spotify.js';

function App() {
  const [searchResults, setSearchResults] = useState([]); // Empty initial
  const [playListTracks, setPlayListTracks] = useState([   
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
  const [playListName, setPlayListName] = useState("My New Playlist");

  function search(term) {
    Spotify.getAccessToken(); // Ensure token is obtained

    Spotify.search(term).then((response) => {
      setSearchResults(response || [
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
    });
  }

  function addTrack(track) {
    const trackExists = playListTracks.find((currentTrack) => currentTrack.id === track.id);
    if (!trackExists) setPlayListTracks([...playListTracks, track]);
  }

  function removeTrack(track) {
    const filteredTrack = playListTracks.filter((currentTrack) => currentTrack.id !== track.id);
    setPlayListTracks(filteredTrack);
  }

  function updatePlayListName(strName) {
    setPlayListName(strName);
  }

  function savePlayList() {
    const tracksUri = playListTracks.map((track) => track.uri);
    Spotify.savePlayList(playListName, tracksUri).then(() => {
      updatePlayListName("My New PlayList");
      setPlayListTracks([]);
    });
  }

  console.log("my searchResults", searchResults);
  console.log("my playListTracks", playListTracks);
  console.log("my playListName", playListName);

  return (
    <div>
      <h1>Your Music Ja<span className="highlight">mmm</span>s</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} 
          />
          <Playlist 
            playListTracks={playListTracks} 
            onRemove={removeTrack}
            playListName={playListName}
            updateName={updatePlayListName}
            onSave={savePlayList}
          />
        </div>
      </div>
      <h1>Made with the power of fruit <span className="highlight">Jam</span>sss</h1>
    </div>
  );
}

export default App;
