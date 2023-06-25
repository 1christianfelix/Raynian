const express = require("express");
const {
  getuser,
  getusers,
  createuser,
} = require("../controllers/UserController");

const {
  getuserstats,
  updateuserstats,
} = require("../controllers/StatsController");

const router = express.Router();

router.get("/", getusers);

// GET single user' stats
router.get("/:id", getuser);

// POST a new user
router.post("/", createuser);

// GET user stats
router.get("/:id/stats", getuserstats);

router.put("/:id/stats", updateuserstats);

// UPDATE a new user

module.exports = router;
