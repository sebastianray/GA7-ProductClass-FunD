'use strict';

const {encryptPwd} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Expenses, {
        foreignKey: 'UserId'
      });
      User.hasOne(models.Budget, {
        foreignKey: 'UserId'
      });
      User.hasMany(models.Subscriptions, {
        foreignKey: 'UserId'
      });
      User.hasOne(models.Wallet, {
        foreignKey: 'UserId'
      });
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg: 'Please input your name'
        },
        notEmpty : {
          msg : "Name/email/password is required"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg: 'Please input your email'
        },
        notEmpty : {
          msg : "Name/email/password is required"
        },
        isEmail : {
          msg : "Invalid email format"
        },
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          msg : "Name/email/password is required"
        },
        notNull: {
          msg: 'Please input your password'
        }
      }
    },
    photo: DataTypes.STRING,
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Date of birth is required!"
        },
        is: {
          args: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
          msg: 'Date of birth must be in date format!'
        },
        apakahCukupUmur(date) {
          if (new Date(date).getFullYear() > 2010) {
            throw Error ('You must older than 2010 year of birth')
          }
        }
      }
    }
  }, {
    hooks : {
      beforeCreate(user){
        user.password = encryptPwd(user.password),
        user.photo = "https://res.cloudinary.com/seb99/image/upload/v1603277547/photo_2020-10-21_17-51-37_d8i0ow.jpg"
      },
      beforeUpdate(user){
        if (user.password) {
          user.password = encryptPwd(user.password);
        }
      }
    },
    sequelize,
    modelName: 'User',
    
  });
  return User;
};