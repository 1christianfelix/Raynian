const express = require("express");
const {
  getuser,
  getusers,
  usernameChecker,
  emailChecker,
} = require("../controllers/UserController");
const { protect } = require("../middleware/authMiddleware");
const {
  getUserStats,
  updateTasksCompleted,
  updateSessionsCompleted,
  updateLongestStreak,
  updateStudyTime,
} = require("../controllers/StatsController");

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
router.get("/:id", getuser);

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
router.get("/:id/stats", getUserStats);

/**
 * Update user task stats
 * PUT /api/user/:id/stats/tasks
 */
router.put("/:id/stats/tasks", updateTasksCompleted);

/**
 * Update user session stats
 * PUT /api/user/:id/stats/sessions
 */
router.put("/:id/stats/sessions", updateSessionsCompleted);

/**
 * Update user longest streak
 * PUT /api/user/:id/stats/longeststreak
 */
router.put("/:id/stats/longeststreak", updateLongestStreak);

/**
 * Update user study time
 * PUT /api/user/:id/stats/studytime
 */
router.put("/:id/stats/studytime", updateStudyTime);

module.exports = router;
