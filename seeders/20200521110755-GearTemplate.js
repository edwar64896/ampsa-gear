'use strict';

var {
    v4: uuidv4
} = require('uuid');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('GearTemplates', [{
            id: uuidv4(),
            category: '*',
            property: 'Category',
            field: 'category',
            mandatory: true,
            autocomplete: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Manufacturer',
            field: 'manufacturer',
            mandatory: true,
            autocomplete: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Serial',
            field: 'serial',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Model',
            field: 'model',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Acquisition Date',
            field: 'acqdate',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Replacement Value',
            field: 'rvalue',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Purchase Value',
            field: 'pvalue',
            mandatory: false,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: 'Wireless Transmitter',
            property: 'Frequency Block',
            field: 'fblock',
            mandatory: false,
            autocomplete: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: 'Wireless Transmitter',
            property: 'Maximum Power',
            field: 'maxpower',
            mandatory: false,
            autocomplete: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('GearTemplates', null, {});
    }
};
