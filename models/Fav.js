const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema(
  {
    UserId: {
      type: String
    },
    TourId: [String],
    SubTotal: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fav", FavSchema);
