const Tintuc = require("../models/TinTuc");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

var imgPath = "";
const tintucControllers = {
    uploadTintucImg: async (req, res, next) => {
      var storage = multer.diskStorage({
        destination: "assets/image/tintuc",
        filename: (req, file, cb) => {
          imgPath  = "" + `${Date.now()}-${file.originalname}`;
          cb(null, `${imgPath}`);
         
        },
      });
      var upload = multer({
        storage: storage,
      }).single("tintucImg");

      upload(req, res, (err) => {
        if (err) {
          res.json({ message: err.message });
        } else {
          next();
        }
      });
    },


  // addTintuc: async (req, res) => {
  //   res.status(200).json(req.body)
  //   console.log(req.body)
  // },

  addTintuc: async (req, res, next) => {
    let newTintuc = await new Tintuc({
      header: req.body.header,
      main_img: imgPath,
      date: req.body.date,
      content: req.body.content,
      news_intro: req.body.news_intro,   
    });
    try {
      
        let tintuc = await newTintuc.save();
      res.status(200).json({ message: "success", tintuc });
      next();
    } catch (err) {
      console.log(req.body.header, req.body.main_img, req.body.date);
      res.status(500).json(err);
    }
  },

  getAllTintuc: async (req, res) => {
    try {
      Tintuc.find({})
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
  reSetImg: async (req, res, next) => {
    // imgPathArr = "";
    imgPath = "";
  },

  patchTintuc: async (req, res, next) => {
    try {
      const tintucUpdate = await Tintuc.findById(req.params.id);
      // remove current Img

      const pathImg = path.resolve(
        `assets/image/tintuc/${tintucUpdate.main_img}`
      );

      fs.unlinkSync(pathImg);

      // update Database
      await tintucUpdate.updateOne({
        header: req.body.header,
        main_img: imgPath,
        date: req.body.date,
        content: req.body.content,
        news_intro: req.body.news_intro,
        // images: imgPath,
      });

      res.json({ message: "Update success" });
      next();
    } catch (err) {
      res.json({ Error: err.message });
    }
  },

  deleteTintuc: async (req, res) => {
    try {
      const tintucFind = await Tintuc.findById(req.params.id);
      const pathImg = path.resolve(
        `assets/image/tintuc/${tintucFind.main_img}`
      );

      fs.unlinkSync(pathImg);

      await Tintuc.remove({ _id: req.params.id });
      res.json({ message: "Delete success" });
    } catch (err) {
      res.json({ Error: err.message });
    }
  },
};

module.exports = tintucControllers;
