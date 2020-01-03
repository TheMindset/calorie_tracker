const Meal = require('../models').Meal
const Food = require('../models').Food

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

const create = (request, response) => {
  return Meal.findOne({
    where: {
      id: request.params.id
    }
  })
  .then(meal => {
    if (meal) {
      return Food.findOne({
        where: {
          id: request.params.food_id
        }
      })
      .then(food => {
        if (food) {
          return meal.addFood(food)
          .then(() => {
            response.setHeader('Content-type', 'application/json')
            response.status(201).send(JSON.stringify({message: `Successfuly added ${food.name} to ${meal.name}`}))
          })
        } else {
          response.setHeader('Content-type', 'application/json')
          response.status(4004).send({ error: 'Food not found' })      
        }
      })
    } else {
      response.setHeader('Content-type', 'application/json')
      response.status(404).send({ error: 'Meal not found' })
    }
  })
  .catch(error => {
    response.setHeader('Content-type', 'application/json')
    response.status(500).send({ error })
  })
}

module.exports = {
  index, create,
}