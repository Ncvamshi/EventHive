
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState(() => {
    const appliedEvents = JSON.parse(localStorage.getItem("appliedEvents")) || [];
    return appliedEvents.includes(id);
  });
  const [showPopup, setShowPopup] = useState(false);

  const [teammates, setTeammates] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);

  const [friends, setFriends] = useState([
    { id: 3, name: "Charlie" },
    { id: 4, name: "Diana" },
    { id: 5, name: "Elena" },
    { id: 6, name: "George" },
  ]);

  const [waitlist, setWaitlist] = useState([
    { id: 7, name: "Hannah" },
    { id: 8, name: "Ian" },
    { id: 9, name: "Jack" },
    { id: 10, name: "Kelly" },
  ]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/home/events/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const addToTeammates = (user, fromList, setList) => {
    setTeammates((prev) => [...prev, user]);
    setList((prev) => prev.filter((u) => u.id !== user.id));
  };

  const removeFromTeammates = (user) => {
    setTeammates((prev) => prev.filter((u) => u.id !== user.id));
    if (user.source === "friends") {
      setFriends((prev) => [...prev, user]);
    } else if (user.source === "waitlist") {
      setWaitlist((prev) => [...prev, user]);
    }
  };

  const handleApply = () => {
    setShowPopup(true);
    setApplied(true);
    const appliedEvents = JSON.parse(localStorage.getItem("appliedEvents")) || [];
    localStorage.setItem("appliedEvents", JSON.stringify([...appliedEvents, id]));
    setShowModal(false);
    setTimeout(() => setShowPopup(false), 2000);
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="event-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="event-details-card">
        <img src={event.logo} alt={`${event.company} logo`} className="event-logo" />
        <h1 className="event-title">{event.title}</h1>
        <p className="event-rate">Rate: {event.rate}</p>
        <p className="event-company">Company: {event.company}</p>
        <button className="apply-btn" onClick={() => setShowModal(true)} disabled={applied}>
          {applied ? "Applied" : "Apply"}
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>
            <div className="modal-content">
              <div className="modal-left">
                <h3>Selected Teammates</h3>
                <ul>
                  {teammates.map((teammate) => (
                    <li key={teammate.id}>
                      <strong>{teammate.name}</strong>
                      <button onClick={() => removeFromTeammates(teammate)}>-</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-right">
                <div className="modal-friends">
                  <h3>Friends</h3>
                  <ul>
                    {friends.map((friend) => (
                      <li key={friend.id}>
                        <strong>{friend.name}</strong>
                        <button onClick={() => addToTeammates({ ...friend, source: "friends" }, friends, setFriends)}>
                          +
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="modal-waitlist">
                  <h3>Waitlist</h3>
                  <ul>
                    {waitlist.map((person) => (
                      <li key={person.id}>
                        <strong>{person.name}</strong>
                        <button onClick={() => addToTeammates({ ...person, source: "waitlist" }, waitlist, setWaitlist)}>
                          +
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <button className="ok-btn" onClick={handleApply}>OK</button>
          </div>
        </div>
      )}

      {showPopup && <div className="popup">Applied!</div>}
    </div>
  );
};

export default EventDetails;
