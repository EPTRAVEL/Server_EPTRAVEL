const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const multer = require("multer");
var imgPath = "";
const dotenv = require("dotenv");
dotenv.config();

let refreshTokens = [];
const authController = {
  //REGISTER
  uploadAvarImg: async (req, res, next) => {
    var storage = multer.diskStorage({
      destination: "assets/image/avatar user",
      filename: (req, file, cb) => {
        imgPath = "" + `${Date.now()}--${file.originalname}`;
        cb(null, `${imgPath}`);
        // console.log(file.originalname)
      },
    });
    maxSize = 10 * 1024 * 1024;
    var upload = multer({
      storage: storage,
      limits: {
        fileSize: maxSize,
      },
    }).single("file");

    upload(req, res, (err) => {
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
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.pass, salt);
    //Create new user
    let newUser = await new User({
      hoTen: req.body.hoTen,
      gioiTinh: req.body.gioiTinh,
      ngaySinh: req.body.ngaySinh,
      diDong: req.body.diDong,
      cMND: req.body.cMND,
      ngayCap: req.body.ngayCap,
      email: req.body.email,
      diaChi: req.body.diaChi,
      pass: hashed,
      avarImg: imgPath,
    });
    try {
      //  upload.single('file');
    

      //Save to DB
      let user = await newUser.save();

      res.status(200).json({ message: "success", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Tạo access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "5m",
      }
    );
  },
  // Tạo refreshToken
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "365d",
      }
    );
  },
  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res.status(404).json({
          message: "Wrong Email!!!!!!",
        });
      }
      const validPassword = await bcrypt.compare(req.body.passWord, user.pass);
      if (!validPassword) {
        return res.status(404).json({
          message: "Wrong passWord!!!",
        });
      }

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        // lưu vô cookies
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        const { passWord, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken }); //status ko co pass => bảo mật hơn
        // res.status(200).json({ message: "success" , accessToken});
      }

      //  res.status(200).json({ message: "success", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    // Lấy refreshToken from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("u r not auth");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("refreshToken is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (tokken) => token !== req.cookies.refreshToken
    );
    res.status(200).json("log out!!");
  },
};

// Store token

// 1) dùng local storage để lưu (dễ bị tất công Xss)
// 2) dùng cookies:
//  -ít bị Xss, gắn vào httponly cookies, -> CSRF: khi các trang web giả mạo kêu nhập....ads....ads -> có Samesite

// 3) Redux store -> lưu access token
//  httponly cookies để lưu refreshToken

// Dùng Bff pattern -> backend for front end

module.exports = authController;
