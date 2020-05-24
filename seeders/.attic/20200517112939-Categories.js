'use strict';

var { v4: uuidv4} = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories', [{
        id: uuidv4(),
        Category: 'Pencil Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        Category: 'Lavalier Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        Category: 'Shotgun Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        Category: 'Field Recorder',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        Category: 'Wireless Transmitter',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        Category: 'Wireless Receiver',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
