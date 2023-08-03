const express = require("express");
const { getRooms, createRoom } = require("../controllers/RoomController");

const router = express.Router();

/**
 * Get Rooms
 * GET /api/room
 */
router.get("/", getRooms);

/**
 * Create Rooms
 * POST /api/room
 */
router.post("/", createRoom);

module.exports = router;
