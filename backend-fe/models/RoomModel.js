const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSettingsSchema = new Schema({
  backgroundSettings: {
    type: Schema.Types.Mixed,
    default: {},
  },
  timerSettings: {
    type: Schema.Types.Mixed,
    default: {},
  },
});

mongoose.model("RoomSettings", roomSettingsSchema);

const roomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    default: false,
    required: true,
  },
  roomSettings: { type: mongoose.Schema.Types.ObjectId, ref: "RoomSettings" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  whiteList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Room", roomSchema);
