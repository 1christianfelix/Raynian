const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  label: {
    type: String,
    default: "none",
  },
  content: {
    type: String,
    default: "none",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  finishDate: {
    type: Date,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  reminderTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
