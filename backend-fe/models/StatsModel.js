const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const longesetStreakSchema = new Schema(
  {
    workTime: {
      type: Number,
      default: 45,
    },
    breakTime: {
      type: Number,
      default: 10,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const statsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  tasksCompleted: {
    type: Number,
    default: 0,
  },
  studyTime: {
    type: Number,
    default: 0,
  },
  sessionsCompleted: {
    type: Number,
    default: 0,
  },
  longestStreak: {
    type: longesetStreakSchema,
    default: {},
  },
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
