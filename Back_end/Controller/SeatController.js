const Seat = require("../Model/Slot");
const Booking = require("../Model/Booking");

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
  const userId = req.user.id;

  if (!placeId || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const result = await Seat.updateMany(
    {
      placeId,
      seatNumber: { $in: seats },
      isBooked: false
    },
    { $set: { isBooked: true } }
  );

  if (result.modifiedCount !== seats.length) {
    return res.status(400).json({ message: "Some seats already booked" });
  }

  await Booking.create({
    userId,
    placeId,
    seats
  });

  res.json({ message: "Booking successful" });
};



module.exports = { getSeats, bookSeats }
