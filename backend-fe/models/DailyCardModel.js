const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyCardSchema = new Schema({
  task: {
    type: String,
    default: "none",
  },
  state: {
    type: String,
    default: "none",
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date,
  },
  frequency: {
    type: Number,
  },
});

module.exports = mongoose.model("DailyCard", DailySchema);
