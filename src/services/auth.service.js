const prisma = require("../config/db");
const AppError = require("../utils/CustomError");
const { hashPassword } = require("../utils/hashPassword");
const { verifyHash } = require("../utils/verifyHash");
const { createToken } = require("../utils/createToken");

const registerUser = async (userData) => {
  let { name, email, password, confirmPassword } = userData;
  // remove whitespaces from input data
  name = name.trim();
  email = email.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();

  // validating input data
  if (!(name && email && password && confirmPassword))
    throw new AppError("user details can't be empty!", 400);
  if (password.length < 8) throw new AppError("password is too short", 400);
  if (password !== confirmPassword)
    throw new AppError("passwords must be similar!", 400);

  // find if an existing user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) throw new AppError("user already exists!", 409);

  // hash the password using bcrypt.js
  const hashedPassword = await hashPassword(password);

  // store user data in db
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // return the user to the controller function
  return newUser;
};

const authenticateUser = async (userData) => {
  let { email, password } = userData;

  // remove whitespaces from the input field
  email = email.trim();
  password = password.trim();

  // validating input field
  if (!(email && password))
    throw new AppError("credentials can't be empty", 400);

  // get the user from db
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // throw error if user not found in the db
  if (!user) throw new AppError("user not found", 404);

  // verify password
  const hashedPassword = user.password;
  const match = await verifyHash(password, hashedPassword);
  if (!match) throw new AppError("invalid password", 400);

  // generate token for the authenticated user
  const tokenData = { userId: user.id, email };
  const token = await createToken(tokenData);

  // store token along with the user data
  const authenticatedUser = await prisma.user.update({
    where: { email },
    data: { token },
  });

  // return the token and user data to the controller
  return { token, authenticatedUser };
};

module.exports = { registerUser, authenticateUser };
