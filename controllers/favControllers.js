const Fav = require("../models/Fav");
const User = require("../models/User");
const Tour = require("../models/Tour");

const favController = {
  //Thêm vào yêu thích
  createFav: async (req, res, next) => {
    const tourId = req.body.tourId;
    const userId = req.body.userId;

    const newFav = new Fav({
      UserId: userId,
      TourId: [tourId],
      SubTotal: 1,
    });

    await newFav.save();

    // Ad Fav vào User model (Create)

    res.status(200).send(newFav);
  },

  updateFav: async (req, res, next) => {
    try {
      const userId = req.body.id;
      const tourList = req.body.TourList;
      const tourListObj = [];

      for (let i = 0; i < tourList.length; i++) {
        tourListObj.push(
          Tour.findOne({
            _id: tourList[i],
          })
        );
      }

      const favOfUser = await Tour.findOne({
        UserId: userId,
      });
      await favOfUser.updateOne({
        TourId: tourListObj,
        SubTotal: tourList.length,
      });
    } catch (err) {
      res.json({ Error: err.message });
    }
  },
  emptyFav: async (req, res, next) => {
    try {
      const userId = req.body.id;

      const favOfUser = await Tour.findOne({
        UserId: userId,
      });
      await favOfUser.updateOne({
        TourId: [],
        SubTotal: 0,
      });
    } catch (err) {
      res.json({ Error: err.message });
    }
  },
  checkFav: async (req, res) => {
    try {
      const userId = req.body.userId;
      const favOfUser = await Fav.findOne({
        UserId: userId
      });
      if (favOfUser !== null) {
        res.json({
          message: "Đã có",
        });
      } else {
        res.json({
          message: "Chưa có",
        });
      }
      // res.json(favOfUser)
      //  console.log(favItem)
    } catch (err) {
      res.status(500).json(err);
    }
  },
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

  getFavOfUser: async (req, res) => {
      const user = req.params.user;
      const favOfUser = await Fav.findOne({
        UserId: user
      });
      res.json(favOfUser.TourId);
  }
};

module.exports = favController;
