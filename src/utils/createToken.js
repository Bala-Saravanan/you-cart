const jwt = require("jsonwebtoken");
const AppError = require("./CustomError");

const { JWT_SECRET, EXPIRES_IN } = process.env;

exports.createToken = async (
  tokenData,
  jwtSecret = JWT_SECRET,
  expiresIn = EXPIRES_IN
) => {
  try {
    const token = await jwt.sign(tokenData, jwtSecret, { expiresIn });
    return token;
  } catch (error) {
    throw new AppError("token creation failed");
  }
};
