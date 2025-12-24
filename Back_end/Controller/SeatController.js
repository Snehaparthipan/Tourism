const Seat = require("../Model/Slot");
const Booking = require("../Model/Booking");

// GET seats for a place
const getSeats = async (req, res) => {
   try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
}


const bookSeats = async (req, res) => {
  try {
    const { placeId, seats, from, to, date } = req.body;
    const userId = req.user.id;

    if (!placeId || !seats?.length || !from || !to || !date) {
      return res.status(400).json({ message: "Missing booking data" });
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
      from,
      to,
      travelDate: date,
      seats
    });

    res.json({ message: "Booking successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Booking failed" });
  }
};

module.exports = { getSeats, bookSeats };
