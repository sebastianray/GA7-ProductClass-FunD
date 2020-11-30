const { Router } = require("express");
const router = Router();
const SubscriptionController = require("../controllers/subscriptions");
const { authentication, authorization } = require("../middlewares/auth");

router.get("/all", authentication, SubscriptionController.getUserSubscriptions);
router.delete("/all/:id", authentication, SubscriptionController.cancelSubscription);

module.exports = router;