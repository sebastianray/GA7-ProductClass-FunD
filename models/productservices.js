'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductServices extends Model {
    static associate(models) {
      ProductServices.belongsTo(models.Products, {
        foreignKey: 'ProductsId'
      });
      ProductServices.hasOne(models.Subscriptions, {
        foreignKey: 'ProductServicesId'
      });
    }
  };
  ProductServices.init({
    service_type: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    repeat: DataTypes.STRING,
    ProductsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductServices',
  });
  return ProductServices;
};