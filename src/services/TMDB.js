import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
// /movie/popular?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
// Here we export the tmdbApi and within it we have provided the reducersPath for our store the base url path and the endpoint(s) we are fetching.
export const tmdbApi = createApi({
  // This is the name of the reducer we have to provide in our store.js
  reducerPath: 'tmdbApi',
  // This is our base path to let the api know where it needs to go
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  // All of our endpoints will be added below
  endpoints: (builder) => {return{
    //* Get Genres
    getGenres: builder.query({
      query: () => { return `genre/movie/list?api_key=${tmdbApiKey}`},
    }),
    
    
    
    //* Get Movies by [Types]
    getMovies: builder.query({
      query: () => { return `movie/popular?page=${page}&api_key=${tmdbApiKey}`; },
    }),
    
  }},
});

// This hook is created for us by redux for each endpoint method we create for our tmdbApi..
export const {
  useGetGenresQuery,
  useGetMoviesQuery,
} = tmdbApi;
