const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { registerUser, authenticateUser } = require("../services/auth.service");

exports.SignIn = asyncErrorHandler(async (req, res, next) => {
  const data = req.body;

  const newUser = await registerUser(data);
  return res.status(200).json({
    success: true,
    message: "user registered successfully",
    newUser,
  });
});

exports.Login = asyncErrorHandler(async (req, res, next) => {
  const userData = req.body;

  const { token, authenticatedUser } = await authenticateUser(userData);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 86400000,
  });

  return res.status(200).json({
    success: true,
    message: "login successfull",
    authenticatedUser,
  });
});
