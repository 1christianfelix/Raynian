const router = require("express").Router();
const passport = require("passport");

/**
 * Handle successful login
 * GET /api/auth/login/success
 */
router.get("/login/success", (req, res) => {
  console.log("\n\n\n\n", req);
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

/**
 * Handle failed login
 * GET /api/auth/login/failed
 */
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

/**
 * Google OAuth login
 * GET /api/auth/google
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * Google OAuth callback
 * GET /api/auth/google/callback
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `http://localhost:3000/auth/login/success`,
    failureRedirect: `${process.env.CLIENT_URL}/failed`,
  })
);

/**
 * Logout
 * GET /api/auth/logout
 */
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
