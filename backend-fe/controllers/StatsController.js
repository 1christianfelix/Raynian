// Import necessary modules
const User = require("../models/UserModel");
const Stats = require("../models/StatsModel");
const mongoose = require("mongoose");

/* Stats Fetching Operations */
// Fetch stats for a specific user
const getUserStats = async (req, res) => {
  const { id } = req.params;

  // Verify the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "user does not exist" });
  }

  // Fetch user stats from the database
  const userStats = await Stats.find({ user: id }).exec();

  // Return the found user stats
  res.status(200).json(userStats);
};

/* Stats Updating Operations */
// Update the stats for a specific user
const updateTasksCompleted = async (req, res) => {
  const { id } = req.params;
  let { tasksCompleted } = req.body;

  // Verify the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  tasksCompleted = tasksCompleted || 0;

  try {
    const updatedStats = await Stats.findOneAndUpdate(
      { user: id },
      { $inc: { tasksCompleted } },
      { new: true }
    );

    if (!updatedStats) {
      return res.status(404).json({ error: "User stats not found" });
    }

    res.status(200).json(updatedStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSessionsCompleted = async (req, res) => {
  const { id } = req.params;
  let { sessionsCompleted } = req.body;

  // Verify the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  sessionsCompleted = sessionsCompleted || 0;

  try {
    const updatedStats = await Stats.findOneAndUpdate(
      { user: id },
      { $inc: { sessionsCompleted } },
      { new: true }
    );

    if (!updatedStats) {
      return res.status(404).json({ error: "User stats not found" });
    }

    res.status(200).json(updatedStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserStats,
  updateTasksCompleted,
  updateSessionsCompleted,
};
