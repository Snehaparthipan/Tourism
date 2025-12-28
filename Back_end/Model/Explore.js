const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    price: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Explore", bookingSchema);
