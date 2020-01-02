const app = require('../../../app')
const request = require('supertest')

const Meal = require('../../models').Meal
const Food = require('../../models').Food

const cleanup = require('../../helpers/testCleanupDatabase')

describe('meals api endpoint', () => {
  test('should request all meals', () => {
    return Meal.create({
      name: 'Breakfeast',
      food: [
        {
          name: "Banana",
          calories: 150,
        },
        {
          name: "Apple",
          calories: 100,
        }
      ]
    }, {  
      includes: 'foods'  
    })
    .then(meal => {
      return Meal.create({
        name: 'Dinner',
        food: [
          {
            name: "Kebab",
            calories: 6000,
          },
          {
            name: "Apple",
            calories: 100,
          }
        ]
      }, {  
        includes: 'foods'  
      })
    })
    .then(meal => {
      request(app)
      .then(response => {
        expect(response.statusCode).toBe(200)

        expect(response.boby.length).toBe(2)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')
      })
    })
  })
})
