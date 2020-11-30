'use strict';

const {
  Model, 
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    static associate(models) {
      Expenses.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  };
  Expenses.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input expenses title'
        },
        notNull: {
          msg: 'Expenses title is required'
        }
      }
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true,
      validate: {
        notEmpty: {
          msg: 'Please input expenses cost'
        },
        notNull: {
          msg: 'Expenses cost is required'
        }
      }
    },
    repeat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    limit_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    month_created: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expenses',
  });
  return Expenses;
};
