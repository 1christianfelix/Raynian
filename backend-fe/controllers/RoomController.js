const Room = require("../models/RoomModel");
const generateRandomString = require("../util/stringGeneration");
const User = require("../models/UserModel");

/* Get all rooms */
const getRooms = async (req, res) => {
  const rooms = await Room.find({}).sort({ createdAt: -1 });

  res.status(200).json(rooms);
};

/* Create a room */
const createRoom = async (req, res) => {
  const { userId, username, public, roomSettings } = req.body;

  const roomId = generateRandomString(8);

  const participant = {
    _id: userId,
    username,
  };

  const newRoom = await Room.create({
    roomId,
    public,
    host: participant,
    participants: [participant],
    roomSettings,
  });

  res.status(200).json(newRoom);
};

module.exports = {
  getRooms,
  createRoom,
};
