const { Router } = require('express');
const router = Router();
const CalendarController = require('../controllers/calendar')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', authentication, CalendarController.getCalendar)

module.exports = router;