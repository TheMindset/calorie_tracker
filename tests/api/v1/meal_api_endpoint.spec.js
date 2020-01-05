const app = require('../../../app')
const request = require('supertest')

const Meal = require('../../../models').Meal
const Food = require('../../../models').Food

const cleanup = require('../../helpers/test_clear_database')

describe('meals api endpoint', () => {

  beforeEach( async () => {
    await cleanup()
  })

  test('should return all meals', () => {
    return Meal.bulkCreate({
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
          name: "Juice 1",
          calories: 200,
        }
      ]
    }, {  
      include: 'foods'  
    })
    .then(() => {
      return Meal.bulkCreate({
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
            name: "Juice 2",
            calories: 139,
          }
        ]
      }, {  
        include: 'foods'  
      })
    })
    .then(() => {
      request(app)
      .get('/api/v1/meals')
      .then(response => {
        expect(response.statusCode).toBe(200)

        expect(response.body.length).toBe(2)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')

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

  test('should add food in a meal', () => {
    return Meal.create({
      name: 'Dinner 2'
    })
    .then(meal => {
      return Food.create({
        name: 'Salad 1',
        calories: 260
      })
      .then(food => {
        return request(app)
        .post(`/api/v1/meals/${meal.id}/foods/${food.id}`)
        .then(response => {
          expect(response.statusCode).toBe(201)

          expect(Object.keys(response.body)).toContain('message')
          
          expect(response.body.message).toBe(`Successfuly added ${food.name} to ${meal.name}`)
        })
      })
    })
  })

  test('should send a 404 error when the meal where add food is not found', () => {
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

  test('should delete food within a meal', () => {
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
          id: 14,
          name: "Juice 2",
          calories: 139,
        }
      ]
    }, {  
      include: 'foods'  
    })
    .then(meal => {
      return request(app)
      .delete(`/api/v1/meals/${meal.id}/foods/14`)
      .then(response => {
        expect(response.statusCode).toBe(204)
      })
    })
  })

  test('should send a 404 error when the food to remove within the meal is not found ', () => {
    return Meal.create({
      name: 'Snack',
      foods: [
        {
          id: 14,
          name: "Juice 3",
          calories: 139,
        }
      ]
    }, {  
      include: 'foods'  
    })
    .then(meal => {
      return request(app)
      .delete(`/api/v1/meals/${meal.id}/foods/99`)
      .then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Not found')
      })
    })
  })  

  test('should return all food in a meal', () => {
    return Meal.create({
      name: 'Lunch',
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
          id: 14,
          name: "Juice 2",
          calories: 139,
        }
      ]
    }, {  
      include: 'foods'  
    })
    .then(meal => {
      return request(app)
      .get(`/api/v1/meals/${meal.id}/foods`)
      .then(response => {
        expect(response.status).toBe(200)

        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')

        expect(Object.keys(response.body)).not.toContain('createdAt')
        expect(Object.keys(response.body)).not.toContain('updatedAt')

        expect(Object.keys(response.body.foods[0])).toContain('id')
        expect(Object.keys(response.body.foods[0])).toContain('name')
        expect(Object.keys(response.body.foods[0])).toContain('calories')

        expect(Object.keys(response.body.foods[0])).not.toContain('createdAt')
        expect(Object.keys(response.body.foods[0])).not.toContain('updatedAt')
      })
    })
  })

  test('should return 404 error when no meal is found to fetch foods for', () => {
    return request(app)
    .get('/api/v1/meals/22/foods')
    .then(response => {
      expect(response.statusCode).toBe(404)
      expect(response.body.error).toBe('Meal not found')
    })
  })
})
