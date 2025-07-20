const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { registerUser, authenticateUser } = require("../services/auth.service");

exports.signIn = asyncErrorHandler(async (req, res, next) => {
  const data = req.body;

  const newUser = await registerUser(data);
  return res.status(200).json({
    success: true,
    message: "user registered successfully",
    newUser,
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const userData = req.body;

  const { token, authenticatedUser } = await authenticateUser(userData);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 86400000,
    sameSite: "none",
  });

  return res.status(200).json({
    success: true,
    message: "login successfull",
    authenticatedUser,
  });
});

exports.logout = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });

  return res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});
