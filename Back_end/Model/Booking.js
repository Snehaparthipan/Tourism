const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login",  
      required: true
    },
    placeId: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    travelDate: {
      type: String,
      required: true
    },
    seats: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
