const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
  city: String,
  cityCode: String,
  airportName: String,
  country: String
});

module.exports = mongoose.model("Airport", airportSchema);
