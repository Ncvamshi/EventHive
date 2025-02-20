// usrProfile.js
import React, { useEffect, useState } from "react";
import "./usrProfile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched profile:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchProfile();
  }, []);
  

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-banner"></div>
        <div className="profile-details">
          <div className="profile-picture">
            <img src={profile.picture} alt="Profile" />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-title">{profile.title}</p>
            <p className="profile-location">{profile.location}</p>
          </div>
          <div className="profile-role">
            <span>Current role</span>
            <button className="role-btn">{profile.role}</button>
          </div>
          <div className="profile-skills">
            <span>Skills</span>
            <div className="skills-list">
              {profile.skills.map((skill, index) => (
                <span className="skill-badge" key={index}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="profile-actions">
            <button className="action-btn edit-btn">Edit Profile</button>
            <button className="action-btn settings-btn">Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
