const express = require('express')
const router = express.Router()
const mealsController = require('../../../controllers/meals_controller')


router.get('/', mealsController.index)
router.post('/:id/foods/:food_id', mealsController.create)

module.exports = router