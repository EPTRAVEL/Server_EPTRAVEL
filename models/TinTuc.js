const mongoose = require("mongoose");

const tintucSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: true
    },
    main_img: {
      type: String,
    },
    date: {
        type: Date
    },
    content: {
        type: String
    },
    tintuc_id:{
        type: String
    },
    news_intro: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tintuc", tintucSchema);
