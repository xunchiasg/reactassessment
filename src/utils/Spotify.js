let accessToken = "";
const clientID = "2fcf121a22924f11b2e05b5d0ac6cd58";
const redirectUrl = "http://localhost:3000/";

// const redirectUrl = "https://your_spotify_app.surge.sh" - to use Netlify free service (to go live);

//What types of objects are stored in variable spotify?
//JSON?
//Objects
//Functions

//const spotify stores function objects
//Two typical approaches in React, OOP approach or functional approach
const Spotify = {
  //Get access token, check for token first
  getAccessToken() {
    //first check for access token
    if (accessToken) return accessToken;

    const toekninURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    //Second check for the access token
    if (toekninURL && expiryTime) {
      // setting access token and expiry time variables
      accessToken = toekninURL[1];
      const expiresIn = Number(expiryTime[1]);

      //log the values for the access token and its expiry
      console.log(accessToken, expiresIn);

      // Setting the access token to expire at the value for expiration time
      // If expires_in = 3600 (1 hour), accessToken'll be cleared after 1 hour (3600 * 1000 ms = 3,600,000 ms or 1 hour).
      window.setTimeout(() => (accessToken = ""), expiresIn * 10000);

      // clearing the url after the access token expires
      window.history.pushState("Access token", null, "/");

      return accessToken;
    } else {
      // Third check for the access token if the first and second check are both false
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;

      window.location = redirect;
    }
  },

  //Search Function Object take in a term to search for
  async search(term) {
    accessToken = Spotify.getAccessToken();
    return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonresponse) => {
        if (!jsonresponse) console.log("Response error"); // Response from spotify is erroneous

        return jsonresponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
        }));
      });
  },

  savePlayList(name, tracksUris){     // savePlayList takes in the name and the Uri of the track to save

    if(!name || !tracksUris)
        return;

    const token = Spotify.getAccessToken();                                                             // Spotify.getAccessToken() remembers me, based on my ClientID
    const header = {Authorization: `Bearer ${token}`};
    let userId = "";

    return fetch(`https://api.spotify.com/v1/me`, {headers: header})                                     // fetch my profile (fetch is me)
            .then((response) => response.json())
            .then((jsonResponse)=>{
                userId = jsonResponse.id;                                                               // process the response of my own ID
                let playlistId = "";
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {                  // fetch playlist of my profile and store the name of my new playlist
                    headers: header, 
                    method: "post", 
                    body: JSON.stringify({name: name})})
                        .then((response)=> response.json())
                        .then((jsonResponse)=>{
                            playlistId = jsonResponse.id;
                            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { // fetch new playlist of my profile and store the songs
                                headers: header,
                                method: "post",
                                body: JSON.stringify({uris: tracksUris})
                            })
                        })
            });
}
};

export { Spotify };

