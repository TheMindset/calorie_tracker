const express = require('express')
const router = express.Router()
const recipesController = require('../../../controllers/recipes/recipes_controller')

router.get('/search_foods', recipesController.searchFoods)
router.get('/total_average_calories', recipesController.totalAverageCalorie)
router.get('/num_of_ingredients', recipesController.numberOfIngredients)

module.exports = router