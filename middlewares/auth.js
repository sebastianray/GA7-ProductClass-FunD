const { Expenses } = require('../models')
const { tokenVerifier } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  console.log("Authentication works!");

  const { access_token } = req.headers;

  if (!access_token) {
    return res.status(404).json({
      msg: "Token not found",
    });
  } else {
    try {
      const decode = tokenVerifier(access_token);
      req.userData = decode;
      next();
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

const authorizationAdmin = (req, res, next) => {
  const name = req.userData.name;
  if (name == 'bastian' || name == 'apson' || name == 'najib') {
    next();
  } else {
    res.status(403).json("Access denied!");
  }
};

const authorization = (req, res, next) => {
  console.log("Authorization works!");
  const id = req.params.id;
  const UserId = req.userData.id

  Expenses.findOne({
    where: {
      id
    }
  }).then(expense => {
    if (expense) {
      if (expense.UserId === UserId) {
        next();
      } else {
        throw {
          status: 403,
          msg: "User doesn't have any access"
        }
      }
    } else {
      throw {
        status: 404,
        msg: "expense not found"
      }
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}

module.exports = {
  authentication,
  authorizationAdmin,
  authorization
}