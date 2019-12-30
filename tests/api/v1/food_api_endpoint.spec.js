const request = require('superset')

const app = require('../../../app')
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

        expect(Object.keys(response.body[0])).toContain('createdAt')
        expect(Object.keys(response.body[0])).toContain('updatedAt')
      })
  
    })
  })
})
