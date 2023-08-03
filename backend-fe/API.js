const express = require("express");
const userRoutes = require("./routes/userRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const oAuthRoutes = require("./routes/oAuthRoutes");
const roomRoutes = require("./routes/roomRoutes");

const router = express.Router();

router.use("/api/user", userRoutes);
router.use("/api/user/auth", userAuthRoutes);
router.use("/api/auth", oAuthRoutes);
router.use("/api/room", roomRoutes);

module.exports = router;
