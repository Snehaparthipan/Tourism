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

seatSchema.index({ placeId: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model("Slot", seatSchema);
