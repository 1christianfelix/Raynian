const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  studyTime: {
    type: Number,
    default: 0,
  },
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
