const request = require('supertest')

const app = require('../../../../app')
const cleanup = require('../../../helpers/test_clear_database')

describe('num of ingredients api endpoint', () => {
  beforeEach(async() =>{
    await cleanup()
  })

  test('should return all recipes by number of ingredients' , () => {
    return request(app)
    .get('/api/v1/recipes/num_of_ingredients?q=10')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(response.body.data.totalIngredients.length).toBe(3)
      expect(Object.keys(response.body.data.totalIngredients[0])).toContain('id')
      expect(Object.keys(response.body.data.totalIngredients[0])).toContain('name')
      expect(Object.keys(response.body.data.totalIngredients[0])).toContain('foodType')
      expect(Object.keys(response.body.data.totalIngredients[0])).toContain('recipeLink')
      expect(Object.keys(response.body.data.totalIngredients[0])).toContain('totalCalories')
      expect(Object.keys(response.body.data.totalIngredients[0])).toContain('numberOfIngredients')
      expect(Object.keys(response.body.data.totalIngredients[0])).toContain('preparationTime')
    })
  })

  test('should return 404 error when no recipes match with the number of ingredients', () => {
    return request(app)
    .get('/api/v1/recipes/num_of_ingredients?q=1')
    .then(response => {
      expect(response.statusCode).toBe(404)

      expect(response.body.error).toBe('No recipes found for that number of ingredients')
    })
  })
})
