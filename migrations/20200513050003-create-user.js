'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Users', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false
          },
          username: {
            type: Sequelize.STRING,
            allowNull: false
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          recoveryToken: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          rememberToken: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          validated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        }, {
          transaction: t
        })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('Users'), {
          transaction: t
        }
      ])
    });
  }
};
