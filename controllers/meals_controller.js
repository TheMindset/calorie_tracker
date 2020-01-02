const Meal = require('../models').Meal

const index = (request, response) => {
  return Meal.findAll({
    include: 'foods'
  })
  .then(meals => {
    response.setHeader('Content-type', 'application/json')
    response.status(200).send(JSON.stringify(meals, ['id', 'name', 'foods', 'id', 'name', 'calories']))
  })
  .catch(error => {
    response.setHeader('Content-type', 'application/json')
    response.status(500).send({ error })
  })
}


module.exports = {
  index,
}