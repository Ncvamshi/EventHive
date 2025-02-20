// routes/profile.js
import express from "express";
const router = express.Router();

// Mock profile data
const profile = {
  name: "Emma Smith",
  title: "Software Engineer",
  location: "Los Angeles, California",
  picture: "https://via.placeholder.com/100x100", // Replace with actual URL
  role: "Software Engineer",
  skills: ["HTML", "CSS", "Dart", "C++", "UI Design"],
};

// Endpoint to get profile
router.get("/", (req, res) => {
  res.json(profile); // Send mock profile data
});

export default router;
