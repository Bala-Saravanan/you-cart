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

exports.updateProduct = async (productId, updateData) => {
  if (updateData.title && typeof updateData.title !== "string") {
    throw new AppError("Title must be a string", 400);
  }
  if (updateData.title && !updateData.title.trim()) {
    throw new AppError("Product name can't be empty", 400);
  }
  if (updateData.description && typeof updateData.description !== "string") {
    throw new AppError("description must be a string", 400);
  }
  if (updateData.description && !updateData.description.trim()) {
    throw new AppError("Product name can't be empty", 400);
  }
  if (
    updateData.price !== undefined &&
    (typeof updateData.price !== "number" || updateData.price < 0)
  ) {
    throw new AppError("Price must be a non-negative number", 400);
  }
  if (
    updateData.quantity !== undefined &&
    (typeof updateData.quantity !== "number" || updateData.quantity < 0)
  ) {
    throw new AppError("Quantity must be a non-negative number", 400);
  }
  if (
    updateData.isAvailable !== undefined &&
    typeof updateData.isAvailable !== "boolean"
  ) {
    throw new AppError("isAvailable must be a boolean", 400);
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: { ...updateData },
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

  return updatedProduct;
};

exports.dropProduct = async (productId) => {
  await prisma.product.delete({
    where: { id: productId },
  });
  return { message: "Product deleted successfully" };
};
