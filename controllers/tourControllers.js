const Tour = require("../models/Tour");

const tourControllers = {
  addTour: async (req, res) => {
    try {
      const newTour = await new Tour({
        ten_tour: req.body.ten_tour,
        images: req.body.images,
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

  patchTour: async (req, res) => {
    try {
      // theo mongod
     const patchTour = await Tour.updateOne(
        { _id: req.params.id },
        {
          $set: {
            ten_tour: req.body.ten_tour,
            images: req.body.images,
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
          },
        }
      );
      res.json({ message: "Update success" });
    } catch (err) {
      res.json({ Error: err.message });
    }
  },
  
  deleteTour: async (req, res) => {
    try {
      await Tour.remove({ _id: req.params.id });
      res.json({ message: "Delete success" });
    } catch (err) {
      res.json({ Error: err.message });
    }
  }
};

module.exports = tourControllers;
