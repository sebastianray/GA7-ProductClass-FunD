const { Router } = require('express');
const router = Router();
const ExpensesController = require('../controllers/expenses')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', authentication, ExpensesController.getUserExpenses)
router.post('/add', authentication, ExpensesController.addExpense)
router.put('/edit/:id', authentication, authorization, ExpensesController.editUserExpense)
router.delete('/delete/:id', authentication, authorization, ExpensesController.deleteExpense)
router.get('/totalmonthly', authentication, ExpensesController.totalMonthlyExpenses)
router.get('/totalyearly', authentication, ExpensesController.totalExpenses)
router.get('/totalbybudget', authentication, ExpensesController.totalExpensesByBudget)

module.exports = router;