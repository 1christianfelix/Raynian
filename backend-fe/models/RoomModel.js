const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSettingsSchema = new Schema({
  timerSettings: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const participantSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const roomSchema = new Schema({
  roomId: {
    type: String,
  },
  public: {
    type: Boolean,
    default: false,
  },
  roomSettings: {
    type: roomSettingsSchema,
  },
  ownerId: {
    type: String,
  },
  participants: { type: [participantSchema] },
});

module.exports = mongoose.model("Room", roomSchema);
