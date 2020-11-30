'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.hasMany(models.ProductServices, {
        foreignKey: 'ProductsId'
      });

    }
  };
  Products.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    backdrop: DataTypes.STRING,
    details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};