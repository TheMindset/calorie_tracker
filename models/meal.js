const toTitlecase = require('../helpers/title_case')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (meal) => {
        meal.name = toTitlecase(meal.name)
      }
    }
  });
  Meal.associate = function(models) {
    Meal.belongsToMany(models.Food, {
      through: 'MealFoods',
      foreignKey: 'MealId',
      otherKey: 'FoodId',
      as: 'foods'
    })
  };
  return Meal;
};