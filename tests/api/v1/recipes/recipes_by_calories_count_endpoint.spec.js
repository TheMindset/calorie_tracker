const express = require('express')
const request = require('supertest')

const app = require('../../../../app')
const cleanup = require('../../../helpers/test_clear_database')

describe('average calories count api endpoint', () => {
  beforeEach(async() =>{
    await cleanup()
  })

  test('should return the total average colories by food type' , () => {
    return request(app)
    .get('/api/v1/recipes/total_average_calories?q=Banana')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(Object.keys(response.body.data.averageCalories[0])).toContain('foodType')
      expect(Object.keys(response.body.data.averageCalories[0])).toContain('average')
    })
  })

  test('should return 404 error when the food type is not found', () => {
    return request(app)
    .get('/api/v1/recipes/total_average_calories?q=pork')
    .then(response => {
      expect(response.statusCode).toBe(404)

      expect(response.body.error).toBe('No food found for food type')
    })
  })

  
})
