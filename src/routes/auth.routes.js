const express = require("express");
const { SignIn, Login } = require("../controllers/auth.controller");
const { verifyToken: authenticated } = require("../middlewares/authentication");

const router = express.Router();

router.post("/sign-up", SignIn);
router.post("/login", Login);

module.exports = { router };
