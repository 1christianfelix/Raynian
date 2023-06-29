const express = require("express");
const { signup, login, logout } = require("../controllers/UserController");

const router = express.Router();

// sign up
router.post("/signup", signup);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

module.exports = router;
