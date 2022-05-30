const Fav = require("../models/Fav");
const User = require("../models/User");
const Tour = require("../models/Tour");

const favController = {
  //Thêm vào yêu thích
  createFav: async (req, res, next) => {
    const tourId = req.body.id;
    const userId = req.body.id;

    const tours = await Tour.findById(tourId);
    const user = await User.findById(userId);

    const Fav = new Fav({
      UserId: user,
      TourId: tours,
      SubTotal: 1,
    });

    await Fav.save();

    // Ad Fav vào User model (Create)

    res.status(200).send("okela", Fav);
  },

  updateFav: async (req, res, next) => {},

  getAllFav: async (req, res) => {
    try {
      Fav.find()
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.json({ Error: error.message });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = favController;
