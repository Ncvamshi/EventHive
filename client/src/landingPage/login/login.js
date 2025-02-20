import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom"; // Use navigate for redirection

const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // State to check if the form is submitted
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsSubmitted(true); // Set the state
    navigate("/home"); // Redirect to /home
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <div className="logo">EventHive</div>
        <h2 className="h22">Create an account</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>

        <div className="footer-links">
          <a href="#sign-in">Have any account? Sign in</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
