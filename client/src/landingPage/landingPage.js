import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="full-page">

      {/* Main Content */}
      <main className="main-content">
        <div className="content-box">
          <h1>Welcome to EventHive</h1>
          <p>Connect with developers, designers, and innovators to build amazing projects.</p>

          <div className="auth-buttons">
            <button onClick={() => navigateTo("/registration")} className="btn btn-signup">
              Sign Up
            </button>
            <button onClick={() => navigateTo("/login")} className="btn btn-login">
              Login
            </button>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default LandingPage;