const toTitleName = require('../helpers/title_name')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (meal) => {
        meal.name = toTitleName(meal.name)
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