import React from "react";
import ReactDOM from "react-dom/client"; // For React 18+
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router
import "./index.css"; // Optional global styles
import Login from "./landingPage/login/login"; // Import Login
import Registeration from "./landingPage/registration/registeration"; // Import Registeration
import LandingPage from "./landingPage/landingPage"; // Import LandingPage
import Home from "./home/Home"; // Import Home
import Profile from "./Profile/User/usrProfile"; // Import Profile
import EventDetails from "./Event/EventDetails";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create the root
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registeration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
