const express = require("express");
const { getuser, getusers, usernameChecker, emailChecker } = require("../controllers/UserController");
const { protect } = require("../middleware/authMiddleware");
const { getuserstats, updateuserstats } = require("../controllers/StatsController");

const router = express.Router();

/**
 * Get all users
 * GET /api/user
 */
router.get("/", getusers);

/**
 * Get single user
 * GET /api/user/:id
 * Protected route: Requires authentication
 */
router.get("/:id", protect, getuser);

/**
 * Check email availability
 * POST /api/user/check/email
 */
router.post("/check/email", emailChecker);

/**
 * Check username availability
 * POST /api/user/check/username
 */
router.post("/check/username", usernameChecker);

/**
 * Get user stats
 * GET /api/user/:id/stats
 */
router.get("/:id/stats", getuserstats);

/**
 * Update user stats
 * PUT /api/user/:id/stats
 */
router.put("/:id/stats", updateuserstats);

module.exports = router;
