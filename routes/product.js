const { Router } = require("express");
const router = Router();
const ProductController = require("../controllers/product");
const { authentication, authorization } = require("../middlewares/auth");

router.get("/all", ProductController.getAllProduct);
router.get("/:id", ProductController.getProduct);
router.post("/:ProductsId/:ProductServiceId", authentication, ProductController.subscribeProduct);

module.exports = router;