const bcrypt = require("bcryptjs");
const AppError = require("./CustomError");

exports.hashPassword = async (password, salt = 10) => {
  try {
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new AppError("password hashing failed");
  }
};
