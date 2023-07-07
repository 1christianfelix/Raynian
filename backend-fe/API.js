const express = require("express");
const userRoutes = require("./routes/userRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const userOauth = require("./routes/auth");

const router = express.Router();

router.use("/api/user", userRoutes);
router.use("/api/user/auth", userAuthRoutes);
router.use("/api/auth", userOauth);

module.exports = router;
