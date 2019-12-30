const Food = require('../models').Food

const index = (request, response) => {
  console.log(request)
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
  console.log(request.params)

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

module.exports = {
  index, show
}