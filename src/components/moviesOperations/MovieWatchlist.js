import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieModal from "./MovieModal";
import { useEffect } from "react";
import "../../style.css";
import { setInitialWatchlist } from "../../store/actions/movieOperationsActions";
import ViewMovieAllDetails from "./ViewMovieAllDetails";
import AddWatchlistIcon from "../images/add.png";
import "../moviesOperations/MoviesPages.css";

const MovieWatchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movieOperation.watchlist);

  useEffect(() => {
    dispatch(setInitialWatchlist());
  }, [dispatch]);

  return (
    <div className="watchlist-container">
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <div className="empty-watchlist-message">
          You have not added any movies to your watchlist. Please click on the{" "}
          <span>
            <img className="images" src={AddWatchlistIcon} alt="add"></img>
          </span>{" "}
          icon to add movies to your watchlist.
        </div>
      ) : (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <MovieModal key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
      <ViewMovieAllDetails />
    </div>
  );
};

export default MovieWatchlist;
