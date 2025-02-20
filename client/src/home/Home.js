
import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [appliedEvents, setAppliedEvents] = useState(() => {
    const storedApplied = localStorage.getItem("appliedEvents");
    return storedApplied ? JSON.parse(storedApplied) : [];
  });

  useEffect(() => {
    localStorage.removeItem("appliedEvents");
  }, []);

  // Fetch events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch from the mock data endpoint
        const response = await fetch("http://localhost:9999/api/home/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data); // Update the state with the fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents(); // Call the function when the component mounts
  }, []);
  
  
  

  const isApplied = (eventId) => appliedEvents.includes(eventId);

  const handleApplyEvent = (eventId) => {
    const updatedApplied = [...appliedEvents, eventId];
    setAppliedEvents(updatedApplied);
    localStorage.setItem("appliedEvents", JSON.stringify(updatedApplied));
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <div className="nav-left">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
        </div>
        <div className="nav-right">
          <button onClick={() => navigate("/profile")}>Profile</button>
        </div>
      </div>

      <div className="content">
        <div className="events-container">
          {events.length > 0 ? (
            events.map((event) => (
              <div className="event-card" key={event.id}>
                <div className="event-header">
                  <p className="event-rate">{event.rate}</p>
                  <button className="bookmark-btn">🔖</button>
                </div>
                <h3 className="event-title">
                  {event.title}
                  {isApplied(event.id) && <span className="applied-tick">✔</span>}
                </h3>
                <div className="event-footer">
                  <img src={event.logo} alt={`${event.company} logo`} className="event-logo" />
                  <p className="event-company">{event.company}</p>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading events...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
