const Explore=require("../Model/Explore")
const BookTour=async (req,res)=>{
     try {
    const booking = await Explore.create(req.body);
    res.status(200).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports={BookTour}