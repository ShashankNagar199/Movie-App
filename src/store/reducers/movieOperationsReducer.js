const getMoviesFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const userWatchlist = localStorage.getItem(`${user.email}_watchlist`);
    return userWatchlist ? JSON.parse(userWatchlist) : [];
  }
  return [];
};

const movieInitialState = {
  movies: [],
  watchlist: getMoviesFromLocalStorage(),
  selectedMovie: null,
  isModalOpen: false,
};

const movieOperationsReducer = (state = movieInitialState, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_BY_TITLE":
      return { ...state, movies: action.payload };
    case "ADD_MOVIE_TO_WATCHLIST":
      const updatedWatchlistAdd = [...state.watchlist, action.payload.movie];
      localStorage.setItem(
        `${action.payload.user.email}_watchlist`,
        JSON.stringify(updatedWatchlistAdd)
      );
      return {
        ...state,
        watchlist: updatedWatchlistAdd,
      };
    case "SET_INITIAL_WATCHLIST":
      return {
        ...state,
        watchlist: action.payload, // Set initial watchlist
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      const updatedWatchlistRemove = state.watchlist.filter(
        (movie) => movie.imdbID !== action.payload.id
      );
      localStorage.setItem(
        `${action.payload.user.email}_watchlist`,
        JSON.stringify(updatedWatchlistRemove)
      );
      return {
        ...state,
        watchlist: updatedWatchlistRemove,
      };
    case "SET_SELECTED_MOVIE": 
      return {
        ...state,
        selectedMovie: action.payload,
        isModalOpen: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        selectedMovie: null,
        isModalOpen: false,
      };
    case "RESET_MOVIES":
      return {
        ...state,
        movies: [],
      };
    case "SUGGEST_DEFAULT_MOVIES":
      return { ...state, movies: action.payload };
    case "FETCH_MOVIE_DETAILS":
      return {
        ...state,
        selectedMovie: action.payload,
      };
    default:
      return state;
  }
};

export default movieOperationsReducer;
