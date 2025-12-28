const Explore=require("../Model/Explore")
const BookTour=async (req,res)=>{
     try {
    const { destination, checkIn, checkOut, price } = req.body;

    const booking = await Explore.create({
      userId: req.user.id, 
      destination,
      checkIn,
      checkOut,
      price,
    });
    res.status(200).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports={BookTour}