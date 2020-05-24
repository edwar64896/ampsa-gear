'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Options', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false
      },
      field: {
        type: Sequelize.STRING,
        allowNull:false
      },
      option: {
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
