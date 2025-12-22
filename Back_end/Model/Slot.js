const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  placeId: {
    type: String,
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Slot", seatSchema);
