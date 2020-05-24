'use strict';

var { v4: uuidv4} = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Manufacturers', [{
        id: uuidv4(),
        name: 'Lectrosonics',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        name: 'Zaxcom',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        name: 'Sony',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        name: 'Sennheiser',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        name: 'Sanken',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        name: 'DPA',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        name: 'Sound Devices',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        name: 'Cantar',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Manufaturers', null, {});
  }
};
