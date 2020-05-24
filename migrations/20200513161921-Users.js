'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addIndex('Users', {
          fields: ['username'],
          unique: true
        }),
        {
          transaction: t
        },
        queryInterface.addIndex('Users', {
          fields: ['email'],
          unique: true
        }),
        {
          transaction: t
        }
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeIndex('Users', {
          fields: ['username'],
          unique: true
        }), {
          transaction: t
        },
        queryInterface.removeIndex('Users', {
          fields: ['email'],
          unique: true
        }), {
          transaction: t
        },
      ])
    });
  }
};
