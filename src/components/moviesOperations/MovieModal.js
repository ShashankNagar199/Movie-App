import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  setSelectedMovie,
  fetchMovieDetails,
} from "../../store/actions/movieOperationsActions";
import AddWatchlistIcon from "../images/add.png";
import removeWatchistIcon from "../images/minus-button.png";
import "../moviesOperations/MoviesPages.css";

const MovieModal = ({ movie }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movieOperation.watchlist);
  const isMovieInWatchlist = watchlist.some(
    (watchlistMovie) => watchlistMovie.imdbID === movie.imdbID
  );

  const addMovieToWatchList = (e) => {
    e.stopPropagation();
    dispatch(addMovieToWatchlist(movie));
  };

  const removeMovieFromWatchList = (e) => {
    e.stopPropagation();
    dispatch(removeMovieFromWatchlist(movie.imdbID));
  };

  const openModal = () => {
    dispatch(fetchMovieDetails(movie.imdbID));
    dispatch(setSelectedMovie(movie));
  };

  return (
    <>
      <div className="movie-box">
        <div className="poster">
          {movie.Poster && <img src={movie.Poster} alt={movie.Title} />}
        </div>
        <div className="movie-details">
          <h3>{movie.Title}</h3>
          <p>({movie.Year})</p>
          <p className="viewMovie-link"  onClick={openModal}>read more...</p>
          <a
            className="watchlist-button"
            onClick={
              isMovieInWatchlist
                ? removeMovieFromWatchList
                : addMovieToWatchList
            }
          >
            {isMovieInWatchlist ? (
              <img
                className="images"
                src={removeWatchistIcon}
                alt="remove"
              ></img>
            ) : (
              <img className="images" src={AddWatchlistIcon} alt="add"></img>
            )}
          </a>
        </div>
      </div>
    </>
  );
};

export default MovieModal;
