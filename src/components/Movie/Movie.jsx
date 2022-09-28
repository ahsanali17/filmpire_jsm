/* eslint-disable react/function-component-definition */
import React from "react";
import { Typography, Grid, Grow, Rating, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";

// We destructure the props here so we have access to data.results.{title,id,poster_path,vote_average...} then we add those into this component and display the way we want too
const Movie = ({ movie, i }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movies/${movie.id}`}>
          <img
            alt={movie.title}
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://wwww.fillmurray.com/200/30"
            }
          />
          <Typography className={classes.title} variant="h5">
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
