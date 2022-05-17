const tourControllers = require('../controllers/tourControllers');

const router = require('express').Router();

//add tour
router.post('/addtour', tourControllers.addTour)
router.get('/', tourControllers.getAllTour)
router.patch('/:id', tourControllers.patchTour)
router.delete('/:id', tourControllers.deleteTour)
module.exports = router;