const app = require('../../app')
const Food = require('../../models').Food

const cleanup = require('../helpers/testCleanupDatabase')

describe('Food Model', () => {
  beforeEach(() => {
    cleanup()
  })

  test('#attributes', () => {
    return Food.create({
      name: 'Bananas',
      calories: 120,
    })
    .then(food => {
      expect(food.dataValues.name).toBe('Bananas')
      expect(food.dataValues.calories).toBe('120')
    })
  })
  
})
