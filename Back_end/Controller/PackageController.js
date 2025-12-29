const PackageBooking = require("../Model/Package");

// BOOK
const bookPackage = async (req, res) => {
  try {
    const booking = await PackageBooking.create({
      userId: req.user.id,
      ...req.body,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// GET MY BOOKINGS
const getMyPackages = async (req, res) => {
  try {
    const bookings = await PackageBooking.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// CANCEL
const cancelPackage = async (req, res) => {
  try {
    const deleted = await PopularPackageBooking.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Package cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Cancel failed" });
  }
};
module.exports={bookPackage,getMyPackages,cancelPackage}