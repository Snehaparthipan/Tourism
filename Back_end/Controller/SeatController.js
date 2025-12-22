const Seat = require("../Model/Slot");

// GET seats for a place
const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find({ placeId: req.params.placeId });
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch seats" });
  }
};


const bookSeats = async (req, res) => {
  const { placeId, seats } = req.body;

  // VALIDATION
  if (!placeId || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ message: "Invalid data" });
  }

  // BOOK SEATS
  const result = await Seat.updateMany(
    {
      placeId,
      seatNumber: { $in: seats },
      isBooked: false
    },
    { $set: { isBooked: true } }
  );

  if (result.modifiedCount === 0) {
    return res.status(400).json({ message: "Seats already booked" });
  }

  res.json({ message: "Booking successful" });
};


module.exports = { getSeats, bookSeats };
