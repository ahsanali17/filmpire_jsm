import axios from "axios";

// Instead of using redux we're simply using axios to make a call to the movie database API
export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

// We export this function so that we can use it in Navbar.jsx
export const fetchToken = async () => {
  try {
    // Await a response from the movieApi get request to create a new token. Destructure the data from the response object
    const { data } = await moviesApi.get("/authentication/token/new");
    console.log("consoling data from fetchToken:", data);
    // Store the token from the data object
    const token = data.request_token;
    console.log("consoling the token from fetchToken:", token);
    // If the data.success is true then
    if (data.success) {
      // In localStorage I will set the request token to be the token I saved from data.request_token
      localStorage.setItem("request_token", token);
      // The line below will tell chrome to authenticate using our token and then redirect back to our site
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log(error, "sorry, your token could not be created");
  }
};

// If session id is not already created we will go ahead and create it
export const createSessionId = async () => {
  // Get the request token from local storage
  const token = localStorage.getItem("request_token");

  // If this token exists then...
  if (token) {
    try {
      // Make a request to moviesApi to create a new authentication session and we will be deconstructing the session_id from the request object and saving it
      const {
        data: { session_id },
      } = await moviesApi.post("authentication/session/new", {
        request_token: token,
      });
      // We will store that session_id to local storage
      localStorage.setItem("session_id", session_id);
      // Return that session_id
      return session_id;
    } catch (error) {
      console.log(
        error,
        "your session is was not created or an unknown error has occurred"
      );
    }
  }
};
