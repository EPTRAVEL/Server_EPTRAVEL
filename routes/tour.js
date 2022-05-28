const tourControllers = require('../controllers/tourControllers');
const multer = require("multer");
const router = require('express').Router();

//add tour
router.post('/addtour',tourControllers.uploadTourImg,tourControllers.addTour,tourControllers.reSetImg)


router.get('/', tourControllers.getAllTour)
// router.get('/:quocgia', tourControllers.getCondition)
// router.get('/:quocgia/:khuvuc', tourControllers.getCondition)
// router.get('/:quocgia/:khuvuc/:noikhoihanh', tourControllers.getCondition)
// router.get('/:quocgia/:khuvuc/:noikhoihanh/:diemden', tourControllers.getCondition)
router.get('/:quocgia/:khuvuc/:noikhoihanh/:diemden:/:thoigian', tourControllers.getCondition)
router.get('/khuyenmai', tourControllers.getTourKhuyenMai)
router.patch('/:id', tourControllers.patchTour)
router.delete('/:id', tourControllers.deleteTour)
module.exports = router;