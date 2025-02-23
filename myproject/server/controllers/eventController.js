const Event = require("../models/eventModel");

const addEvent = async (req, res, next) => {
  try {
    const { title, date } = req.body;
    const userId = req.user._id;

    if (!title || !date) {
      res.status(400);
      throw new Error("Başlıq və tarix daxil edin!");
    }

    const event = await Event.create({ userId, title, date });
    res.status(201).json(event);
  } catch (error) {
    next(error); 
  }
};


const getEvents = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const events = await Event.find({ userId });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findOne({ _id: eventId, userId });

    if (!event) {
      res.status(404);
      throw new Error("Event tapılmadı!");
    }

    await event.remove();
    res.status(200).json({ message: "Event silindi!" });
  } catch (error) {
    next(error);
  }
};

module.exports = { addEvent, getEvents, deleteEvent };
