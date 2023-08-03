const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSettingsSchema = new Schema(
  {
    timerSettings: {
      type: Schema.Types.Mixed,
    },
  },
  { _id: false }
);

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
  invitationLink: {
    type: String,
  },
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
  host: {
    type: participantSchema,
  },
  participants: { type: [participantSchema] },
});

module.exports = mongoose.model("Room", roomSchema);
