const bcrypt = require("bcryptjs");
const AppError = require("./CustomError");

exports.verifyHash = async (unhashed, hashed) => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    throw new AppError("verifying password failed");
  }
};
