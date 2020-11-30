'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    static associate(models) {
      Subscriptions.belongsTo(models.ProductServices, {
        foreignKey: 'ProductServicesId'
      });
      Subscriptions.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  };
  Subscriptions.init({
    start_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    ProductServicesId: DataTypes.INTEGER,
    ProductsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscriptions',
  });
  return Subscriptions;
};