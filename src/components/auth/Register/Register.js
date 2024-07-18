import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/actions/userAuthActions";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const renderToLoginPage = () => {
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === "") {
      setEmailError("Email cannot be empty");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleRegister = () => {
    if (emailError != "") {
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    // Check if the email already exists
    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      alert("User already exists! Please log in or use a different email.");
    } else {
      // Register the user
      const newUser = { email };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      Swal.fire({
        title: "Account Created",
        icon: "success",
        timer: 1000,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      renderToLoginPage();

      // Optionally, you can automatically log in the user here
      // dispatch(login(newUser));

      // Navigate to the login page after registration
      // You can use a navigation library like React Router for this purpose
      // Example: history.push('/login');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <label>Email </label>
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className="register-input"
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <button onClick={handleRegister} className="register-button">
          Sign Up
        </button>
        <p className="signup-link" onClick={renderToLoginPage}>
          Login, If account already created
        </p>
      </div>
    </div>
  );
};

export default Register;
