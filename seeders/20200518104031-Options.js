'use strict';

var { v4: uuidv4} = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Options', [{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Lectrosonics',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Zaxcom',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Sony',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Sennheiser',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Sanken',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'DPA',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Cantar',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Sound Devices',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Tascam',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Rode',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Motorola',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Apple',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Ambient',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Remote Audio',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'manufacturer',
        option: 'Tentacle',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Pencil Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Lavalier Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Shotgun Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Field Recorder',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Wireless Transmitter',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Wireless Receiver',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Computer',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Condensor Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Dynamic Microphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: uuidv4(),
        field: 'category',
        option: 'Timecode Equipment',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Options', null, {});
  }
};
