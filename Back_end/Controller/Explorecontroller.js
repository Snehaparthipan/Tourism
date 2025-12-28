const Explore = require("../Model/Explore");


const BookTour = async (req, res) => {
  console.log("USER ID:", req.user.id);
console.log("BODY:", req.body);
  try {
    const userId = req.user.id; 

    const { destination, checkIn, checkOut, price } = req.body;

    if (!destination || !checkIn || !checkOut || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await Explore.create({
      userId,                // ✅ now set correctly
      destination,
      checkIn,
      checkOut,
      price: Number(price),  // ✅ ensure number
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// GET MY TOUR BOOKINGS
const getMyTourBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Explore.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tour bookings",
      error: error.message,
    });
  }
};

module.exports = { BookTour, getMyTourBookings };
