const Destination = require("../Model/Destination");

const getTopDestinations = async (req, res) => {
  try {
    const data = await Destination.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTopDestinations };
