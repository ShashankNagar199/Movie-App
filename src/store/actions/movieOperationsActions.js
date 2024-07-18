import axios from "axios";

const API_KEY = "7c272cb2";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const getMoviesFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const userWatchlist = localStorage.getItem(`${user.email}_watchlist`);
    return userWatchlist ? JSON.parse(userWatchlist) : [];
  }
  return [];
};

export const searchMoviesByTitle = (title) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}&s=${title}`);
    const searchResults = response.data.Search || [];
    dispatch({ type: "SEARCH_MOVIES_BY_TITLE", payload: searchResults });
  } catch (error) {
    console.error("Error: Unable to find movies:", error);
  }
};

export const fetchMovieDetails = (imdbID) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}&i=${imdbID}`);
    dispatch({ type: "FETCH_MOVIE_DETAILS", payload: response.data });
  } catch (error) {
    console.error("Error: Unable to fetch movie details:", error);
  }
};

export const addMovieToWatchlist = (movie) => (dispatch, getState) => {
  const user = getState().userAuth.user;
  if (user) {
    dispatch({
      type: "ADD_MOVIE_TO_WATCHLIST",
      payload: { movie, user },
    });
  }
};

export const removeMovieFromWatchlist = (id) => (dispatch, getState) => {
  const user = getState().userAuth.user;
  if (user) {
    dispatch({
      type: "REMOVE_MOVIE_FROM_WATCHLIST",
      payload: { id, user },
    });
  }
};

export const setInitialWatchlist = () => (dispatch) => {
  const initialWatchlist = getMoviesFromLocalStorage();
  dispatch({ type: "SET_INITIAL_WATCHLIST", payload: initialWatchlist });
};

export const setSelectedMovie = (movie) => ({
  type: "SET_SELECTED_MOVIE",
  payload: movie,
});

export const closeModal = () => ({
  type: "CLOSE_MODAL",
});

export const resetMovies = () => ({
  type: "RESET_MOVIES",
});

export const suggestDefaultMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}&s=batman`);
    const searchResults = response.data.Search || [];
    dispatch({ type: "SUGGEST_DEFAULT_MOVIES", payload: searchResults });
  } catch (error) {
    console.error("Error: Unable to find movies:", error);
  }
};
