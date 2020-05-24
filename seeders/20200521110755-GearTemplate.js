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
            icon: 'fas fa-clipboard',
            mandatory: true,
            autocomplete: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Manufacturer',
            field: 'manufacturer',
            icon: 'fas fa-city',
            mandatory: true,
            autocomplete: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Serial',
            field: 'serial',
            icon: 'fas fa-id-badge',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Model',
            field: 'model',
            icon: 'fas fa-gem',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Acquisition Date',
            field: 'acqdate',
            icon: 'fas fa-calendar-alt',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Replacement Value',
            field: 'rvalue',
            icon: 'fas fa-money-bill-wave',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: '*',
            property: 'Purchase Value',
            field: 'pvalue',
            icon: 'fas fa-money-bill-wave',
            mandatory: false,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: 'Wireless Receiver',
            property: 'Frequency Block',
            field: 'fblock',
            icon: 'fas fa-broadcast-tower',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: 'Wireless Transmitter',
            property: 'Frequency Block',
            field: 'fblock',
            icon: 'fas fa-broadcast-tower',
            mandatory: true,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: 'Wireless Transmitter',
            property: 'Maximum Power',
            field: 'maxpower',
            icon: 'fas fa-bolt',
            mandatory: false,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: uuidv4(),
            category: 'Lavalier',
            property: 'Colour',
            field: 'colour',
            icon: 'fas fa-palette',
            mandatory: false,
            autocomplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('GearTemplates', null, {});
    }
};
