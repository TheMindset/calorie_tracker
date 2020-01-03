const Meal = require('../models').Meal
const Food = require('../models').Food
const MealFood = require('../models').MealFood

const index = (request, response) => {
  return Meal.findAll({
    include: 'foods'
  })
  .then(meals => {
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send(JSON.stringify(meals, ['id', 'name', 'foods', 'id', 'name', 'calories']))
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json')
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
            response.setHeader('Content-Type', 'application/json')
            response.status(201).send(JSON.stringify({message: `Successfuly added ${food.name} to ${meal.name}`}))
          })
        } else {
          response.setHeader('Content-Type', 'application/json')
          response.status(404).send({ error: 'Food not found' })      
        }
      })
    } else {
      response.setHeader('Content-Type', 'application/json')
      response.status(404).send({ error: 'Meal not found' })
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json')
    response.status(500).send({ error })
  })
}

const foodDelete = (request, response) => {
  MealFood.findOne({
    where: {
      FoodId: request.params.food_id,
      MealId: request.params.id
    }
  })
  .then(mealFood => {
    if (mealFood) {
      return mealFood.destroy()
      .then(destroyedMealFood => {
        response.setHeader('Conent-Type', 'application/json')
        response.status(204).send(JSON.stringify(destroyedMealFood))
      })
    } else {
      response.setHeader('Content-Type', 'application/json')
      response.status(404).send({ error: 'Not found' })
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json')
    response.status(500).send({ error })
  })
}

const findAllFoods = (request, response) => {
  return Meal.findOne({
    where: {
      id: request.params.id
    },
    include: 'foods'
  })
  .then(meal => {
    if (meal) {
      response.setHeader('Content-Type', 'application/json')
      response.status(200).send(JSON.stringify(meal, ['id', 'name', 'foods', 'id', 'name', 'calories']))
    } else {
      response.setHeader('Content-Type', 'application/json')
      response.status(404).send({ error: 'Meal not found' })      
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json')
    response.status(500).send({ error })
  })
}

module.exports = {
  index, create, foodDelete, findAllFoods
}