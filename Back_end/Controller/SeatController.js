const Seat = require("../Model/Seat")
const getSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const seats = await Seat.find({ showId });
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch seats" });
  }
};

const bookSeats = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    if (!showId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    await Seat.updateMany(
      { showId, seatNumber: { $in: seats }, isBooked: false },
      { $set: { isBooked: true } }
    );

    res.status(200).json({ message: "Seats booked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};

module.exports = { getSeats, bookSeats }
