const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    hoTen: {
      type: String,
      required: true,
    },
    gioiTinh: {
      type: String,
      default: "nam",
    },
    ngaySinh: {
      type: Date,
    },
    diDong: {
      type: String,
      required: true,
      unique: true,
    },
    cMND: {
      type: String,
      required: true,
      unique: true,
    },
    ngayCap: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    diaChi: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    avarImg: {
      type: String,
    },
    FavId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fav",
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
