'use strict';

var bcrypt = require('bcrypt');
var { v4: uuidv4} = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
				id: uuidv4(),
        firstName: 'Mark',
        lastName: 'Edwards',
        email: 'mark.p.edwards@gmail.com',
        username: 'mark.p.edwards@gmail.com',
				password: bcrypt.hashSync('aRcudene',10),
        validated: true,
        recoveryToken: null,
        rememberToken: null,
				createdAt: new Date(),
				updatedAt: new Date()
      }], {
			});
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
