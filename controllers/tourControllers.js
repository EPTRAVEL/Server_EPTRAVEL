const Tour = require("../models/model");

const tourControllers = {
  addTour: async (req, res) => {
    try {
      const newTour = await new Tour({
        name: req.body.name,
        maTour: req.body.maTour,
        img: req.body.img,
      });
      const tour = await newTour.save();
      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllTour: async (req, res) => {
    try {
      // const tours = await Tour.find();
      // res.status(200).json(req.body);

      Tour.find({})
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

module.exports = tourControllers;
