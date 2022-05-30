const favController = require('../controllers/favControllers')
const router = require('express').Router();


router.post('/:id', favController.createFav)
router.patch('/:id', favController.updateFav)

router.get('/', favController.getAllFav)

module.exports = router;