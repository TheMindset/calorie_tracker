const express = require('express')
const router = express.Router()
const recipesController = require('../../../controllers/recipes/recipes_controller')

router.get('/', recipesController.searchFoods)

module.exports = router