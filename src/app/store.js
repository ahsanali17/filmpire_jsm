import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';

export default configureStore({
  reducer: {
    // This is the reducer path we have described in our service TMDB.js
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
});
