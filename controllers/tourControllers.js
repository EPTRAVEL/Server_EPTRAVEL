const Tour = require("../models/Tour");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

var imgPathArr = [];
const tourControllers = {
  uploadTourImg: async (req, res, next) => {
    var storage = multer.diskStorage({
      destination: "assets/image/tours",
      filename: (req, file, cb) => {
        let nameTemp = `${Date.now()}-${file.originalname}`;
        cb(null, nameTemp);
        imgPathArr.push(nameTemp);
      },
    });
    var upload = multer({
      storage: storage,
    }).any("tourImg");
    upload(req, res, (err) => {
      if (err) {
        console.log("Lỗi upload 1: " + err.message);
      } else {
        console.log(
          (upload = multer({
            storage: storage,
          }).array("tourImg1"))
        );
        next();
      }
    });
  },

  addTour: async (req, res, next) => {
    console.log(req.body.ten_tour);
    let newTour = await new Tour({
      ten_tour: req.body.ten_tour,
      ma_tour: req.body.ma_tour,
      noikhoihanh: req.body.noikhoihanh,
      sochoconnhan: req.body.sochoconnhan,
      diemden: req.body.diemden,
      ngaykhoihanh: req.body.ngaykhoihanh,
      noidungchitiet: req.body.noidungchitiet,
      diadiemthamquan: req.body.diadiemthamquan,
      phuongtiendichuyen: req.body.phuongtiendichuyen,
      khachsan: req.body.khachsan,
      lichtrinh: req.body.lichtrinh,
      giatiennguoilon: req.body.giatiennguoilon,
      giatientreem: req.body.giatientreem,
      giatientrenho: req.body.giatientrenho,
      giatienembe: req.body.giatienembe,
      giamgia: req.body.giamgia,
      phuthu: req.body.phuthu,
      quocgia: req.body.quocgia,
      khuvuc: req.body.khuvuc,
      images: imgPathArr,
    });

    try {
      const tour = await newTour.save();
      res.status(200).json({ message: "success", newTour });
      next();
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllTour: async (req, res) => {
    try {
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
  reSetImg: async (req, res, next) => {
    imgPathArr = [];
  },
  getCondition: async (req, res) => {
    try {
      var condition = "";
      if (req.params.quocgia == "trongnuoc") {
        condition = {
          quocgia: "Tour du lịch trong nước",
        };
      }
      if (req.params.quocgia == "ngoainuoc") {
        condition = {
          quocgia: "Tour du lịch nước ngoài",
        };
      }

      // var condition = "";
      // var Vquocgia = "";
      // var Vkhuvuc = "";
      // var Vnoikhoihanh = "";
      // var Vdiemden = "";
      // var Vthoigian = "";
      // req.params.thoigian == "all"
      //   ? (Vthoigian = "")
      //   : (Vthoigian = req.params.thoigian);
      // req.params.diemden == "all"
      //   ? (Vdiemden = "")
      //   : (Vdiemden = req.params.diemden);
      // req.params.noikhoihanh == "all"
      //   ? (Vnoikhoihanh = "")
      //   : (Vnoikhoihanh = req.params.noikhoihanh);
      // req.params.khuvuc == "all"
      //   ? (Vkhuvuc = "")
      //   : (Vkhuvuc = req.params.khuvuc);
      // req.params.quocgia == "all"
      //   ? (Vquocgia = "")
      //   : (Vquocgia = req.params.quocgia);
      // condition = {
      //   quocgia: Vquocgia,
      //   khuvuc: Vkhuvuc,
      //   noikhoihanh: Vnoikhoihanh,
      //   diemden: Vdiemden,
      //   thoigian: Vthoigian,
      // };

      // if(req.params.thoigian == undefined||req.params.thoigian=="all"){
      //   condition = {
      //     quocgia: req.params.quocgia,
      //     khuvuc: req.params.khuvuc,
      //     noikhoihanh: req.params.noikhoihanh,
      //     diemden: req.params.diemden,
      //     // thoigian: [*],
      //   };
      // }
      // else if(req.params.dienden == undefined||req.params.dienden == "all"){
      //   condition = {
      //     quocgia: req.params.quocgia,
      //     khuvuc: req.params.khuvuc,
      //     noikhoihanh: req.params.noikhoihanh,
      //     // diemden: req.params.diemden,
      //   };
      // }  else if(req.params.noikhoihanh == undefined||req.params.noikhoihanh == "all"){
      //   condition = {
      //     quocgia: req.params.quocgia,
      //     khuvuc: req.params.khuvuc,
      //     // noikhoihanh: req.params.noikhoihanh,
      //   };
      // } else if(req.params.noikhoihanh == undefined ||req.params.noikhoihanh == "all"){
      //   condition = {
      //     quocgia: req.params.quocgia,
      //     khuvuc: req.params.khuvuc,
      //     // noikhoihanh: req.params.noikhoihanh,
      //   };
      // } else if(req.params.khuvuc == undefined || req.params.khuvuc == "all"){
      //   condition = {
      //     quocgia: req.params.quocgia,
      //     // khuvuc: req.params.khuvuc,
      //   };
      // } else if(req.params.quocgia== undefined || req.params.quocgia == "all"){
      //   condition = {
      //     quocgia: req.params.quocgia,
      //   };
      // }

      Tour.find(condition)
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
  getTourById: async (req, res) => {
    try {
      Tour.find({
        _id: req.params.id
      })
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

  getTourKhuyenMai: async (req, res) => {
    try {
      // const tours = await Tour.find();
      // res.status(200).json(req.body);

      Tour.find({ giamgia: /^(1|2|3|4|5|6|7|8|9)/ })
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
  patchTour: async (req, res, next) => {
    try {
      const tourUpdate = await Tour.findById(req.params.id);
      // remove current Img
      for (let i = 0; i < tourUpdate.images.length; i++) {
        const pathImg = path.resolve(
          `assets/image/tours/${tourUpdate.images[i]}`
        );

        fs.unlinkSync(pathImg);
      }

      // update Database
      await tourUpdate.updateOne({
        ten_tour: req.body.ten_tour,
        ma_tour: req.body.ma_tour,
        noikhoihanh: req.body.noikhoihanh,
        sochoconnhan: req.body.sochoconnhan,
        diemden: req.body.diemden,
        ngaykhoihanh: req.body.ngaykhoihanh,
        noidungchitiet: req.body.noidungchitiet,
        diadiemthamquan: req.body.diadiemthamquan,
        phuongtiendichuyen: req.body.phuongtiendichuyen,
        khachsan: req.body.khachsan,
        lichtrinh: req.body.lichtrinh,
        giatiennguoilon: req.body.giatiennguoilon,
        giatientreem: req.body.giatientreem,
        giatientrenho: req.body.giatientrenho,
        giatienembe: req.body.giatienembe,
        giamgia: req.body.giamgia,
        phuthu: req.body.phuthu,
        quocgia: req.body.quocgia,
        khuvuc: req.body.khuvuc,
        images: imgPathArr,
      });

      res.json({ message: "Update success" });
      next();
    } catch (err) {
      res.json({ Error: err.message });
    }
  },

  deleteTour: async (req, res) => {
    try {
      const tourFind = await Tour.findById(req.params.id);
      console.log(req.params.id);
      // remove current Img
      for (let i = 0; i < tourFind.images.length; i++) {
        const pathImg = path.resolve(
          `assets/image/tours/${tourFind.images[i]}`
        );
        fs.unlinkSync(pathImg);
      }

      await Tour.remove({ _id: req.params.id });
      res.json({ message: "Delete success" });
    } catch (err) {
      res.json({ Error: err.message });
    }
  },
};

module.exports = tourControllers;
