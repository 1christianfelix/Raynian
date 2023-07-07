const express = require("express");
const { signup, login, logout } = require("../controllers/UserController");

const router = express.Router();

/**
 * Sign up
 * POST /api/user/auth/signup
 */
router.post("/signup", signup);

/**
 * Login
 * POST /api/user/auth/login
 */
router.post("/login", login);

/**
 * Logout
 * POST /api/user/auth/logout
 */
router.post("/logout", logout);

module.exports = router;
