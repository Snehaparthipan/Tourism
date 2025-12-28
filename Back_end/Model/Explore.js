const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    price: String,
    createdAt: { type: Date, default: Date.now },
},
{ timestamps: true }
);

module.exports = mongoose.model("Explore", bookingSchema);
