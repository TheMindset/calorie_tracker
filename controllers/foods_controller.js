const Food = require('../models').Food

const index = (request, response) => {
  return Food.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt']}
  })
  .then(foods => {
    response.setHeader('Content-type', 'application/json')
    response.status(200).send(JSON.stringify(foods))
  })
  .catch(error => {
    response.setHeader('Content-type', 'application/json')
    response.status(500).send({ error })
  })
}

const show = (request, response) => {
  return Food.findOne({
    attributes: { 
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      id: request.params.id
    }
  })
  .then(food => {
    if (food) {
      response.setHeader('Content-type', 'application/json')
      response.status(200).send(JSON.stringify(food))
    } else {
      response.setHeader('Content-type', 'application/json')
      response.status(404).send(JSON.stringify({
        error: "Food not found."
      }))
    }
  })
  .catch(error =>{
    response.setHeader('Content-type', 'application/json')
    response.status(500).send({ error })
  })
}

const create = (request, response) => {
  return Food.create({
    name: request.body.name,
    calories: request.body.calories
  })
  .then(food => {
    response.setHeader('Content-type', 'application/json')
    response.status(200).send(JSON.stringify( food, ['id', 'name', 'calories'] ))
  })
  .catch(error => {
    response.setHeader('Content-type', 'application/json')
    response.status(400).send(JSON.stringify({
      error: 'name and calories fields are required.'
    }))
  })
}

const update = (request, response) => {
  return Food.findOne({
    attributes: { 
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      id: request.params.id
    }
  })
  .then(food => {
    if (food) {
      return food.update({
        name: request.body.name,
        calories: request.body.calories
      })
      .then(updatedFood => {
        response.setHeader('Content-type', 'application/json')
        response.status(200).send(JSON.stringify({
          id: updatedFood.id,
          name: updatedFood.name,
          calories: updatedFood.calories
        }))
      })
      .catch(error => {
        response.setHeader('Content-type', 'application/json')
        response.status(500).send({ error })
      })
    } else {
      response.setHeader('Content-type', 'application/json')
      response.status(404).send(JSON.stringify({
        error: "Food not found."
      }))
    }
  })
}

const deleteFood = (request, response) => {
  return Food.findOne({
    where: {
      id: request.params.id
    }
  })
  .then(food => {
    if (food) {
      return food.destroy()
      .then(destroyedFood => {
        response.setHeader('Content-type', 'application/json')
        response.status(204).send(JSON.stringify(destroyedFood))
      })
    } else {
      response.setHeader('Content-type', 'application/json')
      response.status(404).send(JSON.stringify({
        error: "Food not found."
      }))
    }
  })
  .catch(error => {
    response.setHeader('Content-type', 'application/json')
    response.status(500).send({ error })
  })
}



module.exports = {
  index, show, update, deleteFood, create
}