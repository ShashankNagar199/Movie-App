import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMoviesByTitle,
  suggestDefaultMovies,
} from "../../store/actions/movieOperationsActions";
import MovieModal from "./MovieModal";
import "../../style.css";
import AddWatchlistIcon from "../images/add.png";
import removeWatchistIcon from "../images/minus-button.png";
import ViewMovieAllDetails from "./ViewMovieAllDetails";
import "../moviesOperations/MoviesPages.css";

const MoviesDisplayAndSearch = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movieOperation.movies);
  const [isLoading, setLoading] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    await dispatch(searchMoviesByTitle(title));
    setLoading(false);
  };
  if (movies.length == 0 && title === "") {
    dispatch(suggestDefaultMovies());
  }
  return (
    <div className="movies-search-container">
      <div className="instructions-box">
        <div className="headline">
          WELCOME TO <span className="highlighted-text">MOVIE APP</span>
        </div>
        <p>
          Click on{" "}
          <span>
            <img
              className="watchlist-icon"
              src={AddWatchlistIcon}
              alt="add"
            ></img>
          </span>{" "}
          to add a movie to your watchlist and{" "}
          <span>
            <img
              className="watchlist-icon"
              src={removeWatchistIcon}
              alt="remove"
            ></img>
          </span>{" "}
          to remove a movie from your watchlist.
        </p>
        <p>
          View your watchlist by clicking on the <strong>Watchlist</strong>{" "}
          button.
        </p>
        <p>Click on movie to see more details</p>
        <p>Hover on email to see full email</p>
      </div>
      <h2>Search Movies</h2>
      <div className="search-input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
        />
         <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      {movies.length == 0 && title === "" && <h1>Suggested Movies</h1>}
      <div className={movies.length > 0 ? "movies-grid" : ""}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieModal key={movie.imdbID} movie={movie} />)
        ) : (
          <p className="movies-notfound">Movies Not found</p>
        )}
      </div>
      <ViewMovieAllDetails />
    </div>
  );
};

export default MoviesDisplayAndSearch;
