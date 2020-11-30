const { Router } = require('express');
const router = Router();
const userRoutes = require('./user');
const expensesRoutes = require('./expenses');
const budgetRoutes = require('./budget');
const calendarRoutes = require('./calendar');
const productRoutes = require('./product');
const subscriptionRoutes = require('./subscriptions');
const walletRoutes = require('./wallet');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "This is home page of funD"
    })
});

router.use('/users', userRoutes);
router.use('/expenses', expensesRoutes);
router.use('/budget', budgetRoutes);
router.use('/calendar', calendarRoutes);
router.use('/product', productRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/wallet', walletRoutes);

module.exports = router;