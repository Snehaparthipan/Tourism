const Booking = require("../Model/Booking");

const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.json(bookings);
};

module.exports = { getMyBookings };
