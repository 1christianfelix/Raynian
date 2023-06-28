const express = require("express");
const { getuser, getusers } = require("../controllers/UserController");

const {
  getuserstats,
  updateuserstats,
} = require("../controllers/StatsController");

const router = express.Router();

router.get("/", getusers);

// GET single user' stats
router.get("/:id", getuser);

// GET user stats
router.get("/:id/stats", getuserstats);

router.put("/:id/stats", updateuserstats);

module.exports = router;
