const toTitleFoodName = require('../tests/helpers/toTitleFoodName')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (food) => {
        food.name = toTitleFoodName(food.name)
      }
    }
  });
  Food.associate = function(models) {
    Food.belogsToMany(models.Meal, {
      through: 'MealFoods',
      foreignyKey: 'FoodId',
      otherKey: 'MealId',
      as: 'meals'
    })
  };
  return Food;
};
