const request = require('supertest')

const app = require('../../../../app')
const cleanup = require('../../../helpers/test_clear_database')

describe('foods search api endpoint', () => {
  beforeEach(async() =>{
    await cleanup()
  })

  test('should return all recipes by foodType', () => {
    return request(app)
    .get('/api/v1/search_foods?q=Chicken')
    .then(response => {
      console.log(response.statusCode)
      expect(response.statusCode).toBe(200)

      expect(response.body.data.recipeSearch.length).toBe(10)
      expect(Object.keys(response.body.data.recipeSearch[0])).toContain('id')
      expect(Object.keys(response.body.data.recipeSearch[0])).toContain('name')
      expect(Object.keys(response.body.data.recipeSearch[0])).toContain('foodType')
      expect(Object.keys(response.body.data.recipeSearch[0])).toContain('recipeLink')
      expect(Object.keys(response.body.data.recipeSearch[0])).toContain('totalCalories')
      expect(Object.keys(response.body.data.recipeSearch[0])).toContain('numberOfIngredients')
      expect(Object.keys(response.body.data.recipeSearch[0])).toContain('preparationTime')
    })
  })

  test('should return 404 error when no recipes of food type is found', () => {
    return request(app)
    .get('/api/v1/search_foods?q=chicken')
    .then(response => {
      expect(response.statusCode).toBe(404)

      expect(response.body.error).toBe('No recipes found for food type')
    })
  })  
})
