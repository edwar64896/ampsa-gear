'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GearTemplates', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      category: {
        allowNull:false,
        type: Sequelize.STRING
      },
      property: {
        allowNull:false,
        type: Sequelize.STRING
      },
      field: {
        allowNull:false,
        type: Sequelize.STRING
      },
      icon: {
        allowNull:false,
        type: Sequelize.STRING
      },
      mandatory: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      autocomplete: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GearTemplates');
  }
};
