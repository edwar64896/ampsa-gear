'use strict';

var { v4: uuidv4} = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Options', [{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Lectrosonics',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Zaxcom',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Sony',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Sennheiser',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Sanken',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'DPA',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Cantar',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Sound Devices',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Tascam',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Rode',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Motorola',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Apple',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Ambient',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Remote Audio',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Manufacturer',
        name: 'Tentacle',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Pencil Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Lavalier Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Shotgun Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Field Recorder',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Wireless Transmitter',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Wireless Receiver',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Computer',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Pencil Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        category: 'Category',
        name: 'Pencil Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Options', null, {});
  }
};
