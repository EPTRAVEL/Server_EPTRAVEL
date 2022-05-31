const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
    },
    TourId: {
      type: String,
    },
    Total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", FavSchema);
