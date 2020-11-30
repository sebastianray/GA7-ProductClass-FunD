'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Budgets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      set_budget: {
        type: Sequelize.INTEGER
      },
      limit_date: {
        type: Sequelize.DATEONLY
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Budgets');
  }
};