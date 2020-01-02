const app = require('../../../app')
const request = require('supertest')

const Meal = require('../../../models').Meal
const Food = require('../../../models').Food

const cleanup = require('../../helpers/testCleanupDatabase')

describe('meals api endpoint', () => {
  test('should request all meals', () => {
    return Meal.create({
      name: 'Breakfeast',
      foods: [
        {
          name: "Banana",
          calories: 150,
        },
        {
          name: "Kiwi",
          calories: 700,
        },
        {
          name: "juice 2",
          calories: 800,
        }

      ]
    }, {  
      include: 'foods'  
    })
    .then(meal => {
      return Meal.create({
        name: 'Dinner',
        foods: [
          {
            name: "Kebab",
            calories: 6000,
          },
          {
            name: "Apple",
            calories: 100,
          },
          {
            name: "Juice 1",
            calories: 1000,
          }

        ]
      }, {  
        include: 'foods'  
      })
    })
    .then(meal => {
      return request(app)
      .get('/api/v1/meals')
      .then(response => {
        console.log(response.body)
        expect(response.statusCode).toBe(200)

        expect(response.body.length).toBe(2)
        
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('foods')

        expect(Object.keys(response.body[0])).not.toContain('createdAt')
        expect(Object.keys(response.body[0])).not.toContain('updatedAt')

        expect(response.body[0].foods.length).toBe(3)
        expect(Object.keys(response.body[0].foods[0])).toContain('id')
        expect(Object.keys(response.body[0].foods[0])).toContain('name')
        expect(Object.keys(response.body[0].foods[0])).toContain('calories')

        expect(Object.keys(response.body[0].foods[0])).not.toContain('createdAt')
        expect(Object.keys(response.body[0].foods[0])).not.toContain('updatedAt')

      })
    })
  })
})
