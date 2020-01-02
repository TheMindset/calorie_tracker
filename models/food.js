const toTitleName = require('../tests/helpers/toTitleName')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (food) => {
        food.name = toTitleName(food.name)
      }
    }
  });
  Food.associate = function(models) {
    Food.belongsToMany(models.Meal, {
      through: 'MealFoods',
      foreignKey: 'FoodId',
      otherKey: 'MealId',
      as: 'meals'
    })
  };
  return Food;
};
