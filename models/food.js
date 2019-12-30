const toTitleFoodName = require('../tests/helpers/toTitleFoodName')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calorie: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (food) => {
        food.name = toTitleFoodName(food.name)
      }
    }
  });
  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};