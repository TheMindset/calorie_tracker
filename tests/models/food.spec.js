const app = require('../../app')

const Food = require('../../models').Food
const Meal = require('../../models').Meal

const cleanup = require('../helpers/test_clear_database')

describe('Food Model', () => {
  beforeEach(() => {
    cleanup()
  })

  test('should has attributes', () => {
    return Food.create({
      name: 'Bananas',
      calories: 120,
    })
    .then(food => {
      expect(food.dataValues.name).toBe('Bananas')
      expect(food.dataValues.calories).toBe('120')
    })
  })

  test('should uppercase the first word of name attribute', () => {
    return Food.create({
      name: 'kiwi',
      calories: 700,
    })
    .then(food => {
      expect(food.dataValues.name).toBe('Kiwi')
    })
  })
  
  it('should cannot create a food with a name already in database', () => {
    return Food.create({
      name: 'kiwi',
      calories: 700,
    })
    .then(food => {
      return Food.create({
        name: 'kiwi',
        calories: 700,
      })
      .catch(error => {
        expect(error.name).toBe('SequelizeUniqueConstraintError')
      })
    })
  })

  test('should associated with meals', () => {
    return Food.create({
      name: 'kiwi',
      calories: 700,
    })
    .then(food => {
      return Meal.create({
        name: 'First Meal'
      })
      .then(meal => {
        // https://sequelize.org/master/class/lib/associations/has-many.js~HasMany.html#instance-method-has
        // check association
        return food.hasMeal(meal)
        .then(result => {
          expect(result).toBe(false)
          //https://sequelize.org/master/class/lib/associations/has-many.js~HasMany.html#instance-method-add
          // add association
          return food.addMeal(meal)
        })
        .then(() => {
          return food.hasMeal(meal)
        })
        .then(result => {
          console.log(result)
          expect(result).toBe(true)
        })
      })
    })
  })
  
  
})
