const AppError = require("../utils/CustomError");
const prisma = require("../config/db");

exports.saveProduct = async (product, user) => {
  let { title, description, price, isAvailable, quantity } = product;
  title = title.trim();
  description = description.trim();

  if (!title) throw new AppError("product name can't be empty", 400);
  if (typeof price !== "number" || price < 0)
    throw new AppError("price must be a non-negative number", 400);
  if (quantity && (typeof quantity !== "number" || quantity < 0))
    throw new AppError("quantity must be a non-negative number", 400);

  const newProduct = await prisma.product.create({
    data: {
      title,
      description,
      price,
      isAvailable: isAvailable ?? true,
      quantity: quantity ?? 1,
      userId: user.userId,
    },
  });

  return { newProduct };
};

exports.getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    omit: {
      userId: true,
    },
  });
  return products;
};
