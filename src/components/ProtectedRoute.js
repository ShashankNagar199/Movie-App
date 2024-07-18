import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.isUserLoggedIn);

  return isUserLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
