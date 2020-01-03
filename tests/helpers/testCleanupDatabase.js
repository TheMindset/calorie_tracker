const Food = require('../../models').Food
const Meal = require('../../models').Meal

module.exports = async function cleanup() {
  await Food.destroy({ where: {} })
  await Meal.destroy({ where: {} })
}