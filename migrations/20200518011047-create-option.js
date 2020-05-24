'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Options', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull:false
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Options');
  }
};
