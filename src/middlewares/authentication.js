const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "user not logged in",
    });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.currentUser = decodedToken;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
  return next();
};

module.exports = { verifyToken };
