const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userControllers')
const router = require('express').Router();

//Get all users
// có xác thực
// router.get('/', middlewareController.verifyToken ,userController.getAllUsers);
router.get('/' ,userController.getAllUsers);
// router.get('/',userController.getAllUsers);

//delete users
// có xác thực
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

// ko có xác thực để test
router.delete('/:id', userController.deleteUser);

module.exports = router;