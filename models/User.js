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
    CMND: {
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
    passWord: {
      type: String,
      required: true,
    },
    avarImg: {
      type: String
    },

    admin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
