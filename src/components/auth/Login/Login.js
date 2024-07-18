import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/actions/userAuthActions";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import Swal from "sweetalert2";
import { resetMovies,setInitialWatchlist } from "../../../store/actions/movieOperationsActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderToSearchPage = () => {
    navigate("/search");
  };
  const renderToSignUpPage = () => {
    navigate("/signup");
  };

  const onsubmitLoginHandler = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find((user) => user.email === email);

    if (user) {
      dispatch(login(user));
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(resetMovies());
      dispatch(setInitialWatchlist());
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 1200,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      setTimeout(() => {
        renderToSearchPage();
      }, 1000);
    } else {
      alert("User not found! Please register or create an account.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="login-input"
        />
        <button onClick={onsubmitLoginHandler} className="login-button">
          Login
        </button>
        <p className="signup-link" onClick={renderToSignUpPage}>
          Create an account
        </p>
      </div>
    </div>
  );
};

export default Login;
