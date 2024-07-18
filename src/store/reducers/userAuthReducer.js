const userInitialState = {
  isUserLoggedIn: !!localStorage.getItem("user"),
  user: JSON.parse(localStorage.getItem("user")),
};

const userAuthReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, isUserLoggedIn: true, user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, isUserLoggedIn: false, user: null };
    default:
      return state;
  }
};

export default userAuthReducer;
