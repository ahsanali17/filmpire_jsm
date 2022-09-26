import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
// Here we export the tmdbApi and within it we have provided the reducersPath for our store the base url path and the endpoint(s) we are fetching.
export const tmdbApi = createApi({
  // This is the name of the reducer we have to provide in our store.js
  reducerPath: "tmdbApi",
  // This is our base path to let the api know where it needs to go
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  // All of our endpoints will be added below
  endpoints: (builder) => ({
    //* Get Top Rated Movies
    // movie/top_rated?api_key=<<api_key>>&page=1
    getTopRatedMovies: builder.query({
      query: () => `movie/top_rated?page=${page}&api_key=${tmdbApiKey}`,
    }),

    //* Get Popular Movies
    // movie/popular?api_key=<<api_key>>&page=1
    getPopularMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),

    //* Get Genres
    // genre/movie/list?api_key=<<api_key>>
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by [Types]
    // movie/popular?api_key=<<api_key>>&page=1
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page }) => {
        //* Get Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get Movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get Popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

// This hook is created for us by redux for each endpoint method we create for our tmdbApi..
export const {
  useGetTopRatedMoviesQuery,
  useGetPopularMoviesQuery,
  useGetGenresQuery,
  useGetMoviesQuery,
} = tmdbApi;
