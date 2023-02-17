import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

function MovieList({ movies, numberOfMovies }) {
  const classes = useStyles();

  return (
    // A grid that will display all the movies fetched from data in movies.jsx
    // The mapping is data.results {list of all movies in here} then it will render the movie component and pass the data to its props
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
