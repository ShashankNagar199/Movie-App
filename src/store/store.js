import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./reducers/userAuthReducer";
import movieOperationsReducer from "./reducers/movieOperationsReducer";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    movieOperation: movieOperationsReducer,
  },
});
export default store;
