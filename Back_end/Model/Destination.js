const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Paris, Bali
  country: { type: String, required: true },       // France, Indonesia
  description: String,                             // short text
  days: Number,                                    // 5, 7
  price: Number,                                  // 1299
  image: String                                   // image URL
});

module.exports = mongoose.model("Destination", destinationSchema);
