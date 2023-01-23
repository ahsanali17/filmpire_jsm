import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

// import { useSelector } from 'react-redux';
// import { userSelector } from '../../features/auth';

import useStyles from './styles';

// eslint-disable-next-line react/function-component-definition
const Profile = () => {
  const classes = useStyles();
  // const { isAuthenticated, user } = useSelector(userSelector);
  const favoriteMovies = [];
  const logout = () => {
    // Clears the local storage
    localStorage.clear();
    // Refreshes the page
    window.location.href = '/';
  };

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
      {!favoriteMovies.length ? (
        <Typography variant="h5">
          Add favorite movies to see them here
        </Typography>
      ) : (
        <Box>Favorite Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
