const Food = require('../../models').Food
const Meal = require('../../models').Meal
const MealFood = require('../../models').MealFood

module.exports = async function cleanup() {
  await Food.destroy({ where: {} })
  await Meal.destroy({ where: {} })
  await MealFood.destroy({ where: {} })
}