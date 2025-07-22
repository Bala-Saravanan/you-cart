const prisma = require("../config/db");
const AppError = require("../utils/CustomError");

const checkProductOwner = async (req, res, next) => {
  const productId = parseInt(req.params.id);
  const userId = req.currentUser.userId;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  if (product.userId !== userId) {
    return next(new AppError("You are not the owner of the product!", 403));
  }

  next();
};

module.exports = checkProductOwner;
