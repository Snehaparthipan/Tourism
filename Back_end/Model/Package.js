const mongoose = require("mongoose");

const PackageBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    packageId: Number,
    packageTitle: String,
    price: String,
    days: String,
    countries: [String],

    status: {
      type: String,
      default: "Booked",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PopularPackageBooking",PackageBookingSchema);
