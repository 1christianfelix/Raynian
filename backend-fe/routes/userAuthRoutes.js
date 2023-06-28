const express = require("express");
const { signup, login } = require("../controllers/UserController");

const router = express.Router();

// sign up
router.post("/signup", signup);

// sign in
router.post("/login", login);

module.exports = router;
