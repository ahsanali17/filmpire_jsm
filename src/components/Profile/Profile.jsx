import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { userSelector } from '../../features/auth';

import useStyles from './styles';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

// eslint-disable-next-line react/function-component-definition
const Profile = () => {
  const classes = useStyles();
  const { user } = useSelector(userSelector);

  const logout = () => {
    // Clears the local storage
    localStorage.clear();
    // Refreshes the page
    window.location.href = '/';
  };

  const sessionIdFromLocalStorage = localStorage.getItem('session_id');


  const { data: favoriteMovies, refetch: refetchMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: sessionIdFromLocalStorage,
    page: 1
  });

  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: sessionIdFromLocalStorage,
    page: 1
  });

  useEffect(() => {
    refetchMovies();
    refetchWatchlisted();
  }, [])

  return (
    <Box className={classes.bigBox}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {favoriteMovies && !favoriteMovies.results.length && watchlistMovies && !watchlistMovies.results.length ? (
        <Typography variant="h5">
          Add favorite movies to see them here
        </Typography>
      ) : (
        <Box>
          <RatedCards
            title="Favorite Movies"
            data={favoriteMovies}
          />
          <RatedCards
            title="Watchlist Movies"
            data={watchlistMovies}
          />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
