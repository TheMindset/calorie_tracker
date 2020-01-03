const express = require('express')
const router = express.Router()
const mealsController = require('../../../controllers/meals_controller')


router.get('/', mealsController.index)
router.post('/:id/foods/:food_id', mealsController.create)
router.delete('/:id/foods/:food_id', mealsController.foodDelete)
router.get('/:id/foods', mealsController.findAllFoods)

module.exports = router