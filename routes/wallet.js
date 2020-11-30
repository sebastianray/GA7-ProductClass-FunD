const { Router } = require("express");
const router = Router();
const WalletController = require("../controllers/wallet");
const { authentication, authorization } = require("../middlewares/auth");

router.get("/", authentication, WalletController.checkBalance);

module.exports = router;