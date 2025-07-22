const express = require("express");
const productController = require("../controllers/product.controller");
const { verifyToken: authenticated } = require("../middlewares/authentication");
const verifySeller = require("../middlewares/verifySeller");
const checkProductOwner = require("../middlewares/verifyProductOwner");

const router = express.Router();

router.post("/", authenticated, verifySeller, productController.createProduct);
router.get("/", productController.getAllProducts);
router.put(
  "/:id",
  authenticated,
  verifySeller,
  checkProductOwner,
  productController.updateProductData
);
router.delete(
  "/:id",
  authenticated,
  verifySeller,
  checkProductOwner,
  productController.deleteProduct
);

module.exports = { router };
