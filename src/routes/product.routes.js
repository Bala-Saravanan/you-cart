const express = require("express");
const productController = require("../controllers/product.controller");
const { verifyToken: authenticated } = require("../middlewares/authentication");
const verifySeller = require("../middlewares/verifySeller");

const router = express.Router();

router.post("/", authenticated, verifySeller, productController.createProduct);
router.get("/", productController.getAllProducts);

module.exports = { router };
