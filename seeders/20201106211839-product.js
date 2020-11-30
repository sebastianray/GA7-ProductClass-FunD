'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const parseData = JSON.parse(fs.readFileSync('./dataProd.json'));
   const productData = [];
   parseData.forEach(data => {
     const { name, icon, backdrop, details } = data;
     productData.push({
       name, icon, backdrop, details,
       createdAt: new Date(),
       updatedAt: new Date()
     })
   })
   await queryInterface.bulkInsert('Products', productData, {});
  },

  down: async (queryInterface, Sequelize) => {
  }
};
