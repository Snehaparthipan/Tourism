const Explore=require("../Model/Explore")
const getMyTourBookings = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    const bookings = await Explore.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tour bookings",
      error: error.message,
    });
  }
};
const BookTour=async (req,res)=>{
     try {
    const booking = await Explore.create(req.body);
    res.status(200).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports={BookTour,getMyTourBookings}