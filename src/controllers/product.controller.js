const {
  saveProduct,
  getProducts,
  updateProduct,
  dropProduct,
} = require("../services/product.service");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  const productData = req.body;
  const user = req.currentUser;
  const { newProduct } = await saveProduct(productData, user);
  return res.status(201).json({
    success: true,
    message: "product created successfully",
    newProduct,
  });
});

exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await getProducts();
  return res.status(200).json({
    success: true,
    message: "products fetched successfully",
    results: products.length,
    products,
  });
});

exports.updateProductData = asyncErrorHandler(async (req, res, next) => {
  const updateData = req.body;
  const productId = parseInt(req.params.id);
  const updated = await updateProduct(productId, updateData);
  return res.status(200).json({
    success: true,
    message: "product updated successfully",
    updatedData: updated,
  });
});

exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const productId = parseInt(req.params.id);
  await dropProduct(productId);
  return res.status(200).json({
    success: true,
    message: "product deleted successfully!",
  });
});
