const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const roomSettingsSchema = new Schema({
  backgroundSettings: {
    type: Schema.Types.Mixed,
  },
  timerSettings: {
    type: Schema.Types.Mixed,
  },
});

mongoose.model("RoomSettings", roomSettingsSchema);

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
  isLive: {
    type: Boolean,
    required: true,
  },
  roomSettings: { type: mongoose.Schema.Types.ObjectId, ref: "RoomSettings" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  whiteList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Room", roomSchema);
