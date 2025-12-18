const Place=require('../Model/Place')

const searchPlace=async (req, res) => {
  try {
    const search = req.query.search || "";

    const places = await Place.find({
      name: { $regex: search, $options: "i" }
    }).limit(10);

    res.json(places);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}

//for hotel

const Hotel = require("../Model/Hotel");

const searchHotel = async (req, res) => {
  try {
    const search = req.query.search || "";

    const hotels = await Hotel.find({
      city: { $regex: search, $options: "i" }
    }).limit(10);

    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}

//for car

const Cars=require('../Model/Cars')

const searchCars=async (req, res) => {
  try {
    const search = req.query.search || "";

    const carPlaces = await Cars.find({
      name: { $regex: search, $options: "i" }
    }).limit(10);

    res.json(carPlaces);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}



module.exports={searchPlace,searchHotel,searchCars}