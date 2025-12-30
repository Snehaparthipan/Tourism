const TSeat=require("../Model/TrainSeat")
const Booking = require("../Model/Booking");

const getTSeats = async (req, res) => {
  try {
    const { placeId } = req.params;

    if (!placeId) {
      return res.status(400).json({ message: "Place ID is required" });
    }

    const seats = await TSeat.find({ placeId });
    res.json(seats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch seats" });
  }
};



const bookTSeats = async (req, res) => {
  try {
    const { placeId, seats, from, to, date } = req.body;
    const userId = req.user.id;

    if (!placeId || !seats?.length || !from || !to || !date) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    const result = await TSeat.updateMany(
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

module.exports = { getTSeats, bookTSeats }
