const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stats: {
    points: {
      type: Number,
      default: 0,
    },
    studyTime: {
      type: Number,
      default: 0,
    },
  },
  friends: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model("User", userSchema);
