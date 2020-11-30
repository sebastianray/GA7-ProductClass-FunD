const { User, Expenses, Budget } = require('../models')
const sequelize = require('sequelize')
const { yearly, monthly, weekly, daily } = require('../helpers/period')
const { Op } = require('sequelize');

class ExpensesController {
  static async getUserExpenses(req, res) {
    const UserId = req.userData.id;
    try {
      const userExpense = await Expenses.findAll({
        where: { UserId },
        include: [User]
      })
      res.status(200).json(userExpense);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addExpense(req, res, next) {
    const { title, cost, repeat, start_date, limit_date } = req.body
    const UserId = req.userData.id;
    const dateRegex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    const isDateFormat1 = dateRegex.test(start_date);
    const isDateFormat2 = dateRegex.test(limit_date);

    try {
      if (repeat === "" && start_date == "" && limit_date == "") {
        const add = await Expenses.create({
          title,
          cost,
          repeat: null,
          start_date: null,
          limit_date: null,
          UserId
        })
        const set_month = await Expenses.update({
          month_created: new Date(add.createdAt).getMonth() + 1
        },
          {
            where: { id: add.id }
          }
        )
        const data = await Expenses.findOne({
          where: {
            id: add.id,
          },
          attributes: { exclude: ['month_created'] }
        });
        res.status(200).json({ data });
      } else if (repeat === "" || start_date == isDateFormat1 || limit_date == isDateFormat2) {
        res.status(400).json({
          status: 'false',
          msg: 'Please input repeat/start_date/limit_date'
        })
      } else {
        let start = new Date(start_date).toLocaleDateString()
        let today = new Date().toLocaleDateString()
        if (start_date !== '' && start !== today) {
          res.status(400).json({
            status: 'false',
            msg: 'start_date must be same with today'
          })
        } else {
          const add = await Expenses.create({
            title,
            cost,
            repeat,
            start_date,
            limit_date,
            UserId
          })
          const set_month = await Expenses.update({
            month_created: new Date(add.createdAt).getMonth() + 1
          },
            {
              where: { id: add.id }
            }
          )
          const data = await Expenses.findOne({
            where: {
              id: add.id,
            },
            attributes: { exclude: ['month_created'] }
          });
          let recDates
          if (repeat === "DAILY") {
            recDates = daily(start_date, limit_date)
          } else if (repeat === "WEEKLY") {
            recDates = weekly(start_date, limit_date)
          } else if (repeat === "MONTHLY") {
            recDates = monthly(start_date, limit_date)
          } else if (repeat === "YEARLY") {
            recDates = yearly(start_date, limit_date)
          }
          res.status(200).json({ data, recDates });
        }

      }
    } catch (err) {
      next(err)
    }
  }

  static async editUserExpense(req, res, next) {
    const id = req.params.id;
    const { title, cost, repeat, start_date, limit_date } = req.body;
    const dateRegex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    const isDateFormat1 = dateRegex.test(start_date);
    const isDateFormat2 = dateRegex.test(limit_date);

    try {
      const check = await Expenses.findOne({
        where: {
          id,
        },
      });
      if (check) {
        if (repeat === "" && start_date == "" && limit_date == "") {
          const oneTime = await Expenses.update({
            title,
            cost,
            repeat: null,
            start_date: null,
            limit_date: null
          },
            {
              where: { id }
            });
          res.status(200).json({
            msg: "Expense Updated!",
            oneTime
          });
        }
        else if (repeat === "" || start_date == isDateFormat1 || limit_date == isDateFormat2) {
          res.status(400).json({
            status: 'false',
            msg: 'Please input repeat/start_date/limit_date'
          })
        }
        else {
          let start = new Date(start_date).toLocaleDateString()
          let today = new Date().toLocaleDateString()
          if (new Date(start_date) > new Date() && start !== today) {
            res.status(400).json({
              status: 'false',
              msg: 'Start date should not after today!'
            })
          } else {
            const update = await Expenses.update(
              {
                title, cost, repeat, start_date, limit_date
              },
              {
                where: { id },
              }
            );
            res.status(200).json({
              msg: "Expense Updated!",
              update
            });
          }
        }
      } else {
        res.status(404).json({
          msg: "Expense Not Found",
        });
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteExpense(req, res) {
    const id = req.params.id;
    try {
      const result = await Expenses.destroy({
        where: { id }
      });
      res.status(200).json({ result, msg: 'Expense Deleted!' })
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async totalMonthlyExpenses(req, res) {
    const UserId = req.userData.id;
    const { month, year } = req.body;
    const yearRegex = /^(19|20)\d{2}$/
    const yearFormat = yearRegex.test(year);
    const monthRegex = /^([1-9]|1[012])$/
    const monthFormat = monthRegex.test(month);
    let range1 = new Date(`${year}-${month}-01`)
    let range2 = new Date(`${year}-${month}-31`)
    try {
      if (!yearFormat || !monthFormat) {
        res.status(400).json({
          status: 'false',
          msg: 'Please input a valid month/year'
        })
      } else {
        const totalDailyExpenses = await Expenses.findAll({
          where: {
            UserId,
            createdAt: {
              [Op.lte]: range2,
              [Op.gte]: range1
            }
          },
          attributes: [
            'createdAt',
            [sequelize.fn('sum', sequelize.col('cost')), 'total'],
          ],
          order: [['createdAt', 'ASC']],
          group: ['createdAt'],
        })
        const total = await Expenses.findAll({
          where: {
            UserId,
            createdAt: {
              [Op.lte]: range2,
              [Op.gte]: range1
            }
          },
          attributes: [
            [sequelize.fn('sum', sequelize.col('cost')), 'totalExpense'],
          ],
        })
        res.status(201).json({ totalDailyExpenses, total })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async totalExpenses(req, res) {
    const UserId = req.userData.id;
    const { year } = req.body;
    const yearRegex = /^(19|20)\d{2}$/
    const yearFormat = yearRegex.test(year);
    try {
      if (!yearFormat) {
        res.status(400).json({
          status: 'false',
          msg: 'Please input a valid year'
        })
      } else {
        let range1 = new Date(`${year}-01-01`)
        let range2 = new Date(`${year}-12-31`)
        const monthlyExpenses = await Expenses.findAll({
          where: {
            UserId,
            createdAt: {
              [Op.lte]: range2,
              [Op.gte]: range1
            }
          },
          attributes: [
            'month_created',
            [sequelize.fn('sum', sequelize.col('cost')), 'totalExpense'],
          ],
          order: [['month_created', 'ASC']],
          group: ['month_created'],
        })
        res.status(201).json({ monthlyExpenses })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async totalExpensesByBudget(req, res) {
    const UserId = req.userData.id;
    try {
      const userBudget = await Budget.findOne({
        where: { UserId },
      });
      if (!userBudget) {
        res.status(404).json({ msg: 'Please enable budget' })
      } else {
        let budgetAmount = userBudget.set_budget
        let range1 = userBudget.updatedAt
        let range2 = userBudget.limit_date
        const total = await Expenses.sum('cost', {
          where: {
            UserId,
            createdAt: {
              [Op.lte]: range2,
              [Op.gte]: range1
            }
          }
        })
        let budgetLeft = budgetAmount - total
        let percentageUsage = ((total * 100) / budgetAmount).toFixed(2)
        let msg
        if (percentageUsage >= 90 && percentageUsage < 99) {
          msg = `You almost spend all of your budget, it's already ${percentageUsage}%!`
        } else if (percentageUsage < 90) {
          msg = `You use ${percentageUsage}% of your budget, and you still have ${budgetLeft} left in budget.`
        } else if (percentageUsage = 100) {
          msg = `Beware! You have spend all of your budget!`
        } else if (percentageUsage > 100) {
          msg = `Beware! You have spend more than your budget!`
        }
        res.status(200).json({ budgetAmount, total, percentageUsage, msg });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ExpensesController;