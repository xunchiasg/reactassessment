let accessToken ="";
const clientID ="2fcf121a22924f11b2e05b5d0ac6cd58";
const redirectUrl = "http://localhost:3000/";

// const redirectUrl = "https://your_spotify_app.surge.sh" - to use Netlify free service (to go live);

//What types of objects are sstored in variable spotify?
//JSON?
//Objects
//Functions

//const spotify stores function objects 
//Two typical approaches in Reaact, OOP approach or functional apporach 
const Spotify = {

  //Get access token, check for token first
  
  getAccessToken(){
    //first check for access token
    if (accessToken) return accessToken;

    const toekninURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);


    //Second check for the access token
    if (toekninURL && expiryTime) {
      // setting access token and expiry time variables
      accessToken = toekninURL[1];
      const expiresIn = Number(expiryTime[1]);

      //log the values for the accesstoken and its expiry
      console.log(accessToken, expiresIn);

    
  
      // Setting the access token to expire at the value for expiration time
      // If expires_in = 3600 (1 hour), accessToken'll be cleared after 1 hour (3600 * 1000 ms = 3,600,000 ms or 1 hour).
      window.setTimeout(() => (accessToken =""), expiresIn + 1000);
      
      // clearing the url after the access token expires
      window.history.pushState("Access token", null, "/");

      return accessToken;

      }else{

        // Third check for the access token if the first and second check are both false
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;

        window.location = redirect;

      }

    },

  //Search Function Object take in a term to search for 
  async search(term){
    accessToken = Spotify.getAccessToken();
    return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then((response)=> response.json())
    .then((jsonresponse)=>{
      if(!jsonresponse)
        console.log("Response error");  // Response from spotify is errornous 
      
      return jsonresponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
      }));
        

    })
  },
  
  // savePlayList takes in the name and the URL of the track to save
  savePlayList(){

  }  


};

export {Spotify};
