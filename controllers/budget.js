const { Budget } = require("../models");
const sequelize = require("sequelize");

class BudgetController {
  static async getBudget(req, res) {
    const UserId = req.userData.id;
    try {
      const userBudget = await Budget.findAll({
        where: { UserId },
      });
      res.status(200).json(userBudget);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addBudget(req, res, next) {
    const { set_budget, limit_date } = req.body;
    const UserId = req.userData.id;
    try {
      const found = await Budget.findOne({
        where: { UserId },
      })
      if (found) {
        res.status(403).json({
          msg: "Budget already exist",
        });
      } else {
        let limit = new Date(limit_date).toLocaleDateString()
        let today = new Date().toLocaleDateString()
        if (new Date(limit_date) < new Date() || limit == today) {
          res.status(400).json({
            msg: "Your budget limit date must be after today!",
          });
        } else {
          const add = await Budget.create({
            set_budget,
            limit_date,
            UserId
          });
          res.status(200).json(add);
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async editUserBudget(req, res, next) {
    const UserId = req.userData.id;
    const { set_budget, limit_date } = req.body;
    const dateRegex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/i;
    const isDateFormat = dateRegex.test(limit_date);

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: false,
        msg: 'Invalid request'
      })
    } else if (!isDateFormat) {
      res.status(400).json({
        status: false,
        msg: 'Must input the right format of limit date'
      })
    } else {
      try {
        const foundIdUser = await Budget.findOne({
          where: { UserId }
        })
        if (foundIdUser) {
          let limit = new Date(limit_date).toLocaleDateString()
          let today = new Date().toLocaleDateString()
          if (new Date(limit_date) < new Date() || limit == today) {
            res.status(400).json({
              msg: "Your budget limit date must be after today!",
            });
          } else {
            const update = await Budget.update(
              {
                set_budget,
                limit_date
              },
              {
                where: { id: foundIdUser.id }
              }
            );
            res.status(200).json({
              msg: "Budget Updated!", update
            });
          }
        } else {
          res.status(404).json({ msg: 'Budget not found!' })
        }
      } catch (err) {
        next(err)
      }
    }
  }

  static async deleteBudget(req, res) {
    const UserId = req.userData.id;
    try {
      const result = await Budget.destroy({
        where: { UserId },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = BudgetController;
