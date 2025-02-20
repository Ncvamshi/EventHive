import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Add a new event
router.post("/add", async (req, res) => {
  const { title, company, rate, logo, description } = req.body;

  try {
    const event = new Event({
      title,
      company,
      rate,
      logo,
      description,
    });

    await event.save(); // Save to the database
    res.status(201).json({ message: "Event created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// Fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
