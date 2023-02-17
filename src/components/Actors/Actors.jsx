import React, { useState } from 'react';

import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Button
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useHistory } from 'react-router-dom';

import { MovieList, Pagination } from '..';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({id, page});

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if(error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack/>} onClick={() => history.goBack()} color="primary">Go back</Button>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          {data && (
            <img
              className={classes.image}
              src={`https://image.tmdb.org/t/p/w780/${data.profile_path}`}
              alt={data.name}
            />
          )}
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <Box paddingTop="5rem">
            <Typography variant="h3" gutterBottom>
              {data.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Born: {new Date(data.birthday).toDateString()}
            </Typography>
            <Typography variant="body1" align="justify" paragraph>
              {data.biography || 'Sorry, no biography yet...'}
            </Typography>
          </Box>
          <Box paddingTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">Go back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin='2rem 0'>
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        {movies && <Pagination currentPage={page} setPage={setPage} totalPages={movies.total_pages} />}
      </Box>
    </>
  );
}
export default Actors;
