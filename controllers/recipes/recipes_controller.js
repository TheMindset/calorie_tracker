const fetch = require('node-fetch')

const searchFoods = (request, response) => {
  return fetch(`https://calorie-tracker-self-ms.herokuapp.com/graphql?query={recipeSearch(foodType:"${request.query.q}"){id,name,foodType,recipeLink,totalCalories,numberOfIngredients,preparationTime}}`)
  .then(recipeData => {
    return recipeData.json()
  })
  .then(recipes => {
    if (recipes.data.recipeSearch.length === 0) {
      response.setHeader('Content-Type', 'application/json')
      response.status(404).send(JSON.stringify({ error: 'No recipes found for food type' }))
    } else {
      response.setHeader('Content-Type', 'application/json')
      response.status(200).send(JSON.stringify(recipes))
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json')
    response.status(500).send(JSON.stringify({ error }))
  })
}

const totalAverageCalorie = (request, response) => {
  return fetch(`https://calorie-tracker-self-ms.herokuapp.com/graphql?query={averageCalories(foodType:"${request.query.q}"){foodType, average}}`)
  .then(recipeData => {
    console.log(recipeData)
    return recipeData.json()
  })
  .then(avarage => {
    if (avarage.data.averageCalories.length === 0) {
      response.setHeader('Content-Type', 'application/json')
      response.status(404).send(JSON.stringify({ error: 'No food found for food type' }))
    } else {
      response.setHeader('Content-Type', 'application/json')
      response.status(200).send(JSON.stringify(avarage))
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json')
    response.status(500).send(JSON.stringify({ error }))
  })
}

module.exports = {
  searchFoods, totalAverageCalorie
}