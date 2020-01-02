'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food',
      [
        {
          name: "Banana",
          calories: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Apple",
          calories: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Kiwi",
          calories: 700,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Strawberry",
          calories: 40,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {})
  }
};
