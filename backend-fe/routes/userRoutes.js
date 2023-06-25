const express = require("express");
const {
  getuser,
  getusers,
  createuser,
} = require("../controllers/UserController");

const router = express.Router();

// GET all users
router.get("/", getusers);

// GET single user
router.get("/:id", getuser);

// POST a new user
router.post("/", createuser);

// DELETE a new user

// UPDATE a new user

module.exports = router;
