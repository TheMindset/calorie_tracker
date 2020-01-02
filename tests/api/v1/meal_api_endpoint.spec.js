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
          }
        ]
      }, {  
        include: 'foods'  
      })
    })
    .then(meal => {
      request(app)
      .get('/api/v1/meals')
      .then(response => {
        expect(response.statusCode).toBe(200)

        expect(response.boby.length).toBe(2)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')

        expect(Object.keys(response.body[0])).not.toContain('createdAt')
        expect(Object.keys(response.body[0])).not.toContain('updatedAt')

        expect(response.boby[0].foods.length).toBe(3)
        expect(Object.keys(response.body[0].foods[0])).toContain('id')
        expect(Object.keys(response.body[0].foods[0])).toContain('name')
        expect(Object.keys(response.body[0].foods[0])).toContain('calories')

        expect(Object.keys(response.body[0].foods[0])).not.toContain('createdAt')
        expect(Object.keys(response.body[0].foods[0])).not.toContain('updatedAt')
      })
    })
  })

  test('should associate food & meal with food_id & meal_id', () => {
    return Meal.create({
      name: 'Dinner'
    })
    .then(meal => {
      return Food.create({
        name: 'Salad',
        calories: 260
      })
      .then(food => {
        return request(app)
        .post(`/api/v1/meals/${meal.id}/foods/${food.id}`)
        .then(response => {
          expect(response.statusCode).toBe(201)

          expect(Object.keys(response.body)).toContain('message')
          expect(Object.values(response.body)).toContain(`Successfuly added ${food.name} to ${meal.name}`)
        })
      })
    })
  })

  test('should send a 404 error when the meal is not found', () => {
    return Food.create({
      name: 'Harissa',
      calories: 120
    })
    .then(food => {
      return request(app)
      .post(`/api/v1/meals/70/foods/${food.id}`)
      .then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Meal not found')
      })
    })
  })
})
