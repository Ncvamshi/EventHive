// routes/home.js
import express from "express";
const router = express.Router();

// Mock events data
const events = [
  { id: 1, title: "Code Marathon", rate: "50k", company: "Nike", logo: "https://logo.clearbit.com/nike.com" },
  { id: 2, title: "Ideathon", rate: "30k", company: "Google", logo: "https://logo.clearbit.com/google.com" },
  { id: 3, title: "Bug Hunting", rate: "70k", company: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
  { id: 4, title: "Hackton", rate: "55k", company: "Facebook", logo: "https://logo.clearbit.com/facebook.com" },
];

// routes/home.js
router.get("/events", (req, res) => {
  console.log("Fetching events...");
  res.json(events); // Send mock events data
});


router.get("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const event = events.find((e) => e.id === eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});


export default router;