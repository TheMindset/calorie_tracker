# Calorie Tracker

## About

Welcome to the Calorie Tracker. This project is completed during the Module 4 of [Turing School of Software & Design](https://backend.turing.io/).

The deployed site's endpoints can be consumed at:

https://calorie-tracker-self.herokuapp.com/

The accompanying micro-service can be viewed [here](https://calorie-tracker-self-ms.herokuapp.com/).

### Technique Stack

* Node.js / Express

* Squelize

* Jest / Superset

## Endpoints

### GET /api/v1/foods

Returns a list of all foods.

#### Example of expected output:

<details>

```json
[
    {
        "id": 1,
        "name": "Banana",
        "calories": "120"
    },
    {
        "id": 2,
        "name": "Orange",
        "calories": "80"
    },
    {
        "id": 3,
        "name": "Strawberry",
        "calories": "20"
    },
    {
        "id": 4,
        "name": "Chicken",
        "calories": "200"
    }
]
```
</details>

---

### GET /api/v1/food/:id

Returns the food matching the specified ID.

#### Example of expected output:

<details>

```json
{
    "id": 5,
    "name": "Salad",
    "calories": "260"
}
```
</details>

---

### POST /api/v1/food/:id

Creates a new food in the database. Name and calories are required.

#### Exemple of request:

<details>

```json
body: 
{
    "name": "Maffé",
    "calories": "3600"
}
```
</details>

#### Successful output:

<details>

```json
{
    "id": 24,
    "name": "Maffé",
    "calories": "3600"
}
```
</details>

---

### PATCH /api/v1/food/:id

Updates the food matching the specified ID.

#### Exemple of request:

<details>

```json
body: 
{
    "name": "Maffé pimenté",
    "calories": "3700"
}
```
</details>

#### Successful output:

<details>

```json
{
    "id": 24,
    "name": "Maffé Pimenté",
    "calories": "3700"
}
```
</details>

---

### DELETE /api/v1/food/:id

Deletes the food matching with the specified ID. Returns 204 if the request is successful.

---

### GET /api/v1/meals

Returns a list of all meals.

#### Example of expected output:

<details>

```json
[
    {
        "id": 1,
        "name": "Breakfeast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": "120"
            },
            {
                "id": 2,
                "name": "Orange",
                "calories": "80"
            },
            {
                "id": 3,
                "name": "Strawberry",
                "calories": "20"
            }
        ]
    },
    {
        "id": 2,
        "name": "Brunch",
        "foods": [
            {
                "id": 4,
                "name": "Chicken",
                "calories": "200"
            },
            {
                "id": 5,
                "name": "Salad",
                "calories": "260"
            },
            {
                "id": 6,
                "name": "Mimosa",
                "calories": "280"
            }
        ]
    }
]

```
</details>

---

### GET /api/v1/meals/:id/foods

Returns the specified meal with all associated foods.

#### Example of successful output:

<details>

```json
{
    "id": 3,
    "name": "Lunch",
    "foods": [
        {
            "id": 2,
            "name": "Orange",
            "calories": "80"
        },
        {
            "id": 5,
            "name": "Salad",
            "calories": "260"
        },
        {
            "id": 3,
            "name": "Strawberry",
            "calories": "20"
        }
    ]
}
```
</details>

---

### POST /api/v1/meals/:id/foods/:food_id

Create a new association between the specified meal and food.

#### Example of successful output:

<details>

```json
{
  "message": "Successfully added FOODNAME to MEALNAME"
}
```
</details>

---

### DELETE /api/v1/meals/:id/foods/:food_id

Deletes th association between the specified meal and food. Returns 204 if the request is successful.

---

### GET /api/v1/recipes/search_foods?q=Chicken

Returns a list of all recipes witch match with the specified food type.

#### Example of successful output:

<details>

```json
{
    "data": {
        "recipeSearch": [
            {
                "id": "11",
                "name": "Chicken Vesuvio",
                "foodType": "Chicken",
                "recipeLink": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
                "totalCalories": 4056,
                "numberOfIngredients": 11,
                "preparationTime": 60
            },
            {
                "id": "12",
                "name": "Chicken Gravy",
                "foodType": "Chicken",
                "recipeLink": "http://www.marthastewart.com/332664/chicken-gravy",
                "totalCalories": 1092,
                "numberOfIngredients": 7,
                "preparationTime": 270
            },
            {
                "id": "13",
                "name": "Chicken Marsala",
                "foodType": "Chicken",
                "recipeLink": "http://www.saveur.com/classic-chicken-marsala-recipe",
                "totalCalories": 2404,
                "numberOfIngredients": 11,
                "preparationTime": 121
            },
            {
                "id": "14",
                "name": "Kreplach (Chicken Dumplings)",
                "foodType": "Chicken",
                "recipeLink": "https://www.tastingtable.com/entry_detail/chefs_recipes/10154/Matzo_balls_watch_your_back.htm",
                "totalCalories": 4279,
                "numberOfIngredients": 9,
                "preparationTime": 10
            }
        ]
    }
}
```
</details>

---

### GET /api/v1/recipes/recipes/num_of_ingredients?q=10

Returns all recipes with the specified amount of ingredients.

#### Example of successful output:

<details>

```json
{
    "data": {
        "totalIngredients": [
            {
                "id": "18",
                "name": "Chicken Soup",
                "foodType": "Chicken",
                "recipeLink": "http://www.cookstr.com/recipes/chicken-soup-3-sharon-lebewohl",
                "totalCalories": 3185,
                "numberOfIngredients": 10,
                "preparationTime": 120
            },
            {
                "id": "22",
                "name": "Asparagus sushi",
                "foodType": "Sushi",
                "recipeLink": "http://www.jamieoliver.com/recipes/vegetables-recipes/asparagus-sushi/",
                "totalCalories": 1381,
                "numberOfIngredients": 10,
                "preparationTime": 45
            },
            {
                "id": "69",
                "name": "Key Lime Scallop Ceviche with Plantain Chips",
                "foodType": "Plantain",
                "recipeLink": "http://www.frenchrevolutionfood.com/2010/06/the-secret-ingredient-key-lime-part-i-key-lime-scallop-ceviche/",
                "totalCalories": 758,
                "numberOfIngredients": 10,
                "preparationTime": 202
            }
        ]
    }
}
```
</details>

---

### GET /api/v1/recipes/recipes/sorted_ingredients?q=Chicken

Returns all recipes, sorted by number of ingredients from the least to the greatest.

#### Example of successful output:

<details>

```json
{
    "data": {
        "sortIngredients": [
            {
                "id": "20",
                "name": "Easy Chicken Stock",
                "foodType": "Chicken",
                "recipeLink": "http://www.myrecipes.com/recipe/easy-chicken-stock",
                "totalCalories": 2386,
                "numberOfIngredients": 2,
                "preparationTime": 90
            },
            {
                "id": "12",
                "name": "Chicken Gravy",
                "foodType": "Chicken",
                "recipeLink": "http://www.marthastewart.com/332664/chicken-gravy",
                "totalCalories": 1092,
                "numberOfIngredients": 7,
                "preparationTime": 270
            },
            {
                "id": "19",
                "name": "Chicken Saltimbocca",
                "foodType": "Chicken",
                "recipeLink": "http://www.cookingchanneltv.com/recipes/chicken-saltimbocca.html",
                "totalCalories": 1492,
                "numberOfIngredients": 9,
                "preparationTime": 35
            },
            {
                "id": "14",
                "name": "Kreplach (Chicken Dumplings)",
                "foodType": "Chicken",
                "recipeLink": "https://www.tastingtable.com/entry_detail/chefs_recipes/10154/Matzo_balls_watch_your_back.htm",
                "totalCalories": 4279,
                "numberOfIngredients": 9,
                "preparationTime": 10
            }
        ]
    }
}
```
</details>

---

### GET /api/v1/recipes/recipes/sorted_prep_time?q=Banana

Returns all recipes, sorted by the preparation time from the least to the greatest.

#### Example of successful output:

<details>

```json
{
    "data": {
        "sortPrepTime": [
            {
                "id": "48",
                "name": "Banana Pineapple Green Drink",
                "foodType": "Banana",
                "recipeLink": "http://rawmazing.com/recipe/banana-pineapple-green-drink/",
                "totalCalories": 297,
                "numberOfIngredients": 4,
                "preparationTime": 1
            },
            {
                "id": "44",
                "name": "Banana-Blueberry Smoothie",
                "foodType": "Banana",
                "recipeLink": "http://www.marthastewart.com/336635/banana-blueberry-smoothie",
                "totalCalories": 325,
                "numberOfIngredients": 3,
                "preparationTime": 5
            },
            {
                "id": "49",
                "name": "Chocolate & Banana recipes",
                "foodType": "Banana",
                "recipeLink": "http://www.eatingwell.com/recipe/249387/chocolate-banana/",
                "totalCalories": 111,
                "numberOfIngredients": 3,
                "preparationTime": 5
            },
            {
                "id": "41",
                "name": "Banana Snack Wraps recipes",
                "foodType": "Banana",
                "recipeLink": "http://www.pbs.org/food/recipes/banana-snack-wraps/",
                "totalCalories": 344,
                "numberOfIngredients": 3,
                "preparationTime": 15
            }
        ]
    }
}
```
</details>

---

## Get Started

### Requirements

* [Node 12.13.1](https://nodejs.org/en/download/) - Node Version
* [PostgresQL](https://www.postgresql.org/download/)

### Clone 

```
$ git clone git@github.com:TheMindset/calorie_tracker.git
$ cd calorie_tracker
$ npm install
```

### Setup Database

Run this command from the `calorie_tracker` project directory.

```
$ npx sequelize db:create
$ npx sequelize db:migrate

```

### API Exploration

Once installation and database setup are complete, explore the various API endpoints with the following steps:
* From the `calorie_tracker` project directory, start up the server `$ npm start`
* Open your browser, and visit `http://localhost:3000/`
* Query the available endpoints by appending to `http://localhost:3000/` in your browser.

### Running Tests

You can run the tests implemented with Jest by run this command `$ npm test`.

#### Exemple of expected output
```bash 
Test Suites: 4 passed, 4 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        5.108s
Ran all test suites.
```
