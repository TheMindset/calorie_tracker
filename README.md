# Calorie Tracker

## About

Welcome to the Calorie Tracker. This project is completed during the Module 4 of [Turing School of Software & Design](https://backend.turing.io/).

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

#### Successful output:

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
