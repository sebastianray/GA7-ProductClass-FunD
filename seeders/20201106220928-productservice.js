'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const parseData = JSON.parse(fs.readFileSync('./dataProdService.json'));
   const productServiceData = [];
   parseData.forEach(data => {
     const { service_type, cost, repeat, ProductsId } = data;
     productServiceData.push({
       service_type, cost, repeat, ProductsId,
       createdAt: new Date(),
       updatedAt: new Date()
     })
   })
   await queryInterface.bulkInsert('ProductServices', productServiceData, {});
  },

  down: async (queryInterface, Sequelize) => {
  }
};
