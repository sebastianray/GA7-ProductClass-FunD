'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate(models) {
      Budget.belongsTo(models.User, {
        foreignKey: "UserId"
      });
    }
  };
  Budget.init({
    set_budget:{
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true,
      validate: {
        notEmpty: {
          msg: 'Please input your budget'
        },
        notNull: {
          msg: 'Invalid request'
        }
      }
    },
    limit_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input the limit date'
        },
        notNull: {
          msg: 'Invalid request'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        args: true,
        msg: 'You already have a budget',
      },
    }
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};