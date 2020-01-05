const express = require('express')
const request = require('supertest')

const app = require('../../../../app')
const cleanup = require('../../../helpers/test_clear_database')

describe('sorted recipes api endpoint', () => {
  beforeEach(async() =>{
    await cleanup()
  })

  test('should return all recipes sorted by number of ingredients' , () => {
    return request(app)
    .get('/api/v1/recipes/sorted_ingredients?q=Chicken')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(response.body.data.sortIngredients.length).toBe(10)
      expect(Object.keys(response.body.data.sortIngredients[0])).toContain('id')
      expect(Object.keys(response.body.data.sortIngredients[0])).toContain('name')
      expect(Object.keys(response.body.data.sortIngredients[0])).toContain('foodType')
      expect(Object.keys(response.body.data.sortIngredients[0])).toContain('recipeLink')
      expect(Object.keys(response.body.data.sortIngredients[0])).toContain('totalCalories')
      expect(Object.keys(response.body.data.sortIngredients[0])).toContain('numberOfIngredients')
      expect(Object.keys(response.body.data.sortIngredients[0])).toContain('preparationTime')
      expect(response.body.data.sortIngredients[0].numberOfIngredients).toBe(2)
    })
  })

  test('should return 404 error when no recipes match with the food type', () => {
    return request(app)
    .get('/api/v1/recipes/sorted_ingredients?q=1')
    .then(response => {
      expect(response.statusCode).toBe(404)

      expect(response.body.error).toBe('No recipes found for the food type')
    })
  })

  test('should return all recipes sorted by the preparation time' , () => {
    return request(app)
    .get('/api/v1/recipes/sorted_prep_time?q=Banana')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(response.body.data.sortPrepTime.length).toBe(10)
      expect(Object.keys(response.body.data.sortPrepTime[0])).toContain('id')
      expect(Object.keys(response.body.data.sortPrepTime[0])).toContain('name')
      expect(Object.keys(response.body.data.sortPrepTime[0])).toContain('foodType')
      expect(Object.keys(response.body.data.sortPrepTime[0])).toContain('recipeLink')
      expect(Object.keys(response.body.data.sortPrepTime[0])).toContain('totalCalories')
      expect(Object.keys(response.body.data.sortPrepTime[0])).toContain('numberOfIngredients')
      expect(Object.keys(response.body.data.sortPrepTime[0])).toContain('preparationTime')
      expect(response.body.data.sortPrepTime[0].preparationTime).toBe(1)
    })
  })


  test('should return 404 error when no recipes match with the food type', () => {
    return request(app)
    .get('/api/v1/recipes/sorted_prep_time?q=1')
    .then(response => {
      expect(response.statusCode).toBe(404)

      expect(response.body.error).toBe('No recipes found for the food type')
    })
  })
})
