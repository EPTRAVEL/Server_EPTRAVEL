const authController = require('../controllers/authControllers');

const router = require('express').Router();
const multer = require("multer");
const upload = multer({ dest: 'assets/image/avatar user/' })

//regis
// router.post('/register', authController.registerUser);
router.post('/register', authController.uploadAvarImg, authController.registerUser);

//login
router.post('/login', authController.loginUser);



module.exports = router;