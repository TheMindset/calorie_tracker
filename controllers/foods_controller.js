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

module.exports = {
  index,
}