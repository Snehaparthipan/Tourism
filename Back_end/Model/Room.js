const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  type: { type: String, required: true },   
  totalRooms: { type: Number, required: true },
  bookedRooms: { type: Number, default: 0 }
});

module.exports = mongoose.model("Room", roomSchema);
