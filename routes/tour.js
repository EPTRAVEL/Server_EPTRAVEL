const tourControllers = require('../controllers/tourControllers');

const router = require('express').Router();

//add tour
router.post('/addtour', tourControllers.addTour)
router.get('/', tourControllers.getAllTour)

module.exports = router;