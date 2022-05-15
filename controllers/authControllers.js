const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
var imgPath = "";
const authController = {
  //REGISTER
  uploadAvarImg: async (req, res, next) => {
    
    var storage = multer.diskStorage({
      destination: "assets/image/avatar user",
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
        // console.log(file.originalname)
        imgPath = 'AvatarOfUser/'+`${Date.now()}--${file.originalname}`;
      },
    });
    maxSize = 10 * 1024 * 1024;
    var upload = multer({
      storage: storage,
      limits: {
        fileSize: maxSize,
      },
    }).single("file");

    upload(req, res,(err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        // res.json({ message: "Saving Avatar-img Success" });
        next();
        // console.log(("file receive: ", req.file.filename));
      }
    });
  },
  registerUser: async (req, res) => {
    //upload img file

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.passWord, salt);
    //Create new user
    let newUser = await new User({
      hoTen: req.body.hoTen,
      gioiTinh: req.body.gioiTinh,
      ngaySinh: req.body.ngaySinh,
      diDong: req.body.diDong,
      CMND: req.body.CMND,
      ngayCap: req.body.ngayCap,
      email: req.body.email,
      diaChi: req.body.diaChi,
      passWord: hashed,
      avarImg: imgPath,
    });
    try {
      //  upload.single('file');

      //Save to DB
      let user = await newUser.save();

      res.status(200).json({  message: "success", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        res.status(404).json("Wrong Email!!!!!!");
      }
      const validPassword = await bcrypt.compare(
        req.body.passWord,
        user.passWord
      );
      if (!validPassword) {
        res.status(404).json("Wrong passWord!!!");
      }

      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          process.env.JWT_ACCESS_KEY,
          {
            expiresIn: "5m",
          }
        );
        const { passWord, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken }); //status ko co pass => bảo mật hơn
        // res.status(200).json({ message: "success" , accessToken});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = authController;
