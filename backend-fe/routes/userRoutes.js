const express = require("express");
const { getuser, getusers, usernameChecker, emailChecker } = require("../controllers/UserController");
const { protect } = require("../middleware/authMiddleware");

const {
  getuserstats,
  updateuserstats,
} = require("../controllers/StatsController");

const router = express.Router();

router.get("/", getusers);

// GET single user' stats
router.get("/:id", protect, getuser);
router.post('/check/email', emailChecker)
router.post('/check/username', usernameChecker)

// GET user stats
router.get("/:id/stats", getuserstats);

router.put("/:id/stats", updateuserstats);

module.exports = router;
