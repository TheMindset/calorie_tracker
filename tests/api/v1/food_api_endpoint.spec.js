const app = require('../../../app')
const request = require('supertest')

const Food = require('../../../models').Food
const cleanup = require('../../helpers/testCleanupDatabase')

describe('Food api endpoint', () => {

  beforeEach(() => {
    cleanup()
  })

  test('should returns all foods', () => {
    return Food.bulkCreate([
      {
          name: "Banana",
          calories: 150,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Apple",
          calories: 100,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Kiwi",
          calories: 700,
          createdAt: new Date(),
          updatedAt: new Date()
      }
    ]).then(() => {
      return request(app)
      .get('/api/v1/foods')
      .then(response => {
        expect(response.statusCode).toBe(200)

        expect(response.body.length).toBe(3)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')

        expect(Object.keys(response.body[0])).not.toContain('createdAt')
        expect(Object.keys(response.body[0])).not.toContain('updatedAt')
      })
    })
  })

  test('returns a single food', () => {
    return Food.bulkCreate([
    {
      id: 1,
      name: "Apple",
      calories: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "Kiwi",
      calories: 700,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
    .then(food => {
      return request(app)
      .get('/api/v1/foods/2')
      .then(response => {
        expect(Object.values(response.body)).toContain(2)
        expect(Object.values(response.body)).toContain('Kiwi')
        expect(Object.values(response.body)).toContain('700')

        expect(Object.keys(response.body)).not.toContain('createdAt')
        expect(Object.keys(response.body)).not.toContain('updatedAt')
      })
    })
  })
  
  test('returns 404 error when user fetch single food with invalid id', () => {
    return Food.bulkCreate([
      {
        id: 1,
        name: "Apple",
        calories: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Kiwi",
        calories: 700,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    .then(food => {
      return request(app)
      .get('/api/v1/foods/3')
      .then(response => {
        expect(response.statusCode).toBe(404)
        expect((response.body.error)).toBe('Food not found.')
      })
    })
  })

  test('returns a single food updated', () => {
    return Food.create({
      id: 1,
      name: "Apple",
      calories: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(food => {
      return request(app)
      .patch(`/api/v1/foods/${food.id}`)
      .send({
        name: 'Kiwi',
        calories: 80
      })
      .then(response => {
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('calories')

        expect(Object.keys(response.body)).not.toContain('createdAt')
        expect(Object.keys(response.body)).not.toContain('updatedAt')
      })
    })
  })

  test('returns 404 error when user want update food with invalid id', () => {
    return Food.bulkCreate({
      id: 2,
      name: "Kiwi",
      calories: 700,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(food => {
      return request(app)
      .patch('/api/v1/foods/40')
      .send({
        name: 'Kiwi',
        calories: 80
      })
      .then(response => {
        expect(response.statusCode).toBe(404)
        expect((response.body.error)).toBe('Food not found.')
      })
    })
  })

  test('user can delete a food', () => {
    return Food.create(
      {
        id: 1,
        name: "Kiwi",
        calories: 700,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    )
    .then(food => {
      return request(app)
      .delete(`/api/v1/foods/${food.id}`)
      .then(response => {
        expect(response.status).toBe(204)
      })
    })
  })

  test('returns 404 error when user want udelete food with invalid id', () => {
    return Food.bulkCreate({
      id: 1,
      name: "Kiwi",
      calories: 700,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(food => {
      return request(app)
      .delete('/api/v1/foods/40')
      .then(response => {
        expect(response.statusCode).toBe(404)
        expect((response.body.error)).toBe('Food not found.')
      })
    })
  })


})
