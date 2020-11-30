const { Expenses } = require('../models')
const sequelize = require('sequelize')
const { yearly, monthly, weekly, daily } = require('../helpers/period')
const { Op } = require('sequelize')

class CalendarController {
    static async getCalendar(req, res) {
        const UserId = req.userData.id;
        try {
            const userExpense = await Expenses.findAll({
                where: {
                    UserId,
                    [Op.not]: [
                        { repeat: null }
                    ]
                }
            })
            let expenseDates = []
            let expenseSched = {}
            userExpense.forEach(el => {
                let recDates
                let repeat = el.repeat
                let start_date = el.start_date
                let limit_date = el.limit_date
                if (repeat === "DAILY") {
                    recDates = daily(start_date, limit_date)
                } else if (repeat === "WEEKLY") {
                    recDates = weekly(start_date, limit_date)
                } else if (repeat === "MONTHLY") {
                    recDates = monthly(start_date, limit_date)
                } else if (repeat === "YEARLY") {
                    recDates = yearly(start_date, limit_date)
                }
                expenseSched = {};
                expenseSched.title = el.title
                expenseSched.cost = el.cost
                expenseSched.repeat = el.repeat
                expenseSched.payment_schedule = recDates
                expenseDates.push(expenseSched)
            });
            res.status(200).json(expenseDates);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = CalendarController