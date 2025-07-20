const express = require("express");
const authController = require("../controllers/auth.controller");
const { verifyToken: authenticated } = require("../middlewares/authentication");

const router = express.Router();

router.post("/sign-up", authController.signIn);
router.post("/login", authController.login);
router.post("/logout", authenticated, authController.logout);

module.exports = { router };
