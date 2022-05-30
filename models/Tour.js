const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    ten_tour: {
      type: String,
    //   required: true
    },
    ma_tour: {
      type: String,
    //   required: true
    },
    images: {
      type: [String],
    },
    noikhoihanh: {
      type: String,
    },
    sochoconnhan: {
      type: String,
    },
    diemden: {
      type: String,
    },
    ngaykhoihanh: {
      type: String,
    },
    noidungchitiet: {
      type: String,
    },
    diadiemthamquan: {
      type: String,
    },
    phuongtiendichuyen: {
      type: String,
    },
    khachsan: {
      type: String,
    },
    lichtrinh: {
      type: String,
    },
    giatiennguoilon: {
      type: String,
    },
    giatientreem: {
      type: String,
    },
    giatientrenho: {
      type: String,
    },
    giatienembe: {
      type: String,
    },
    giamgia: {
      type: String,
    },
    phuthu: {
      type: String,
    },
    quocgia: {
      type: String,
    },
    khuvuc: {
      type: String,
    },
    Fav: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fav",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
