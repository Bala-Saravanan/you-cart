const prisma = require("../config/db");

const verifySeller = async (req, res, next) => {
  const { userId } = req.currentUser;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user.seller) {
      return res.status(400).json({
        success: false,
        message: "user is not a seller",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  return next();
};

module.exports = verifySeller;
