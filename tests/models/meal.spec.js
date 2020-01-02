const app = require('../../app')

const Food = require('../../models').Food
const Meal = require('../../models').Meal

const cleanup = require('../helpers/testCleanupDatabase')

describe('Meal Model', () => {
  
  beforeEach(() => {
    cleanup()
  })

  test('should has attributes', () => {
    return Meal.create({
      name: 'Lunch'
    })
    .then(meal => {
      expect(meal.dataValues.name).toBe('Lunch')
    })
  })

  test('should uppercase the first word of name attribute', () => {
    return Meal.create({
      name: 'breakfeast'
    })
    .then(meal => {
      expect(meal.dataValues.name).toBe('Breakfeast')
    })
  })

  test('should cannot create a meal with the same name in database', () => {
    return Meal.create({
      name: 'Second Breakfeast'
    })
    .then(meal => {
      return Meal.create({
        name: 'Second Breakfeast'
      })
      .catch(error => {
        expect(error.name).toBe('SequelizeUniqueConstraintError')
      })
    })
  })

  test('should associated with food', () => {
    return Meal.create({
      name: 'Third Lunch'
    })
    .then(meal => {
      return Food.create({
        name: 'Apple',
        calories: 400
      })
      .then(food => {
        return meal.hasFood(food)
        .then(result => {
          expect(result).toBe(false)

          return meal.addFood(food)
        })
        .then(() => {
          return meal.hasFood(food)
          .then(result => {
            expect(result).toBe(true)
          })
        })
      })
    })
  })
  
})
