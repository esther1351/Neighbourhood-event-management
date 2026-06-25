const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add event
router.post("/", async (req, res) => {
  try {
    const { title, description, date, venue, organizer } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      organizer,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;