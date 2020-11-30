const { Router } = require("express");
const router = Router();
const BudgetController = require("../controllers/budget");
const { authentication, authorization } = require("../middlewares/auth");

router.get("/", authentication, BudgetController.getBudget);
router.post("/add", authentication, BudgetController.addBudget);
router.put("/edit", authentication, BudgetController.editUserBudget);
router.delete("/delete", authentication, BudgetController.deleteBudget);

module.exports = router;
