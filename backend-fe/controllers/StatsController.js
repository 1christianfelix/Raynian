// Import necessary modules
const User = require("../models/UserModel");
const Stats = require("../models/StatsModel");
const mongoose = require("mongoose");

/* Stats Fetching Operations */
// Fetch stats for a specific user
const getuserstats = async (req, res) => {
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
const updateuserstats = async (req, res) => {
  const { id } = req.params;
  let { points, studyTime } = req.body;

  // Verify the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  // Default points and studyTime to 0 if they're not provided
  points = points || 0;
  studyTime = studyTime || 0;

  try {
    // Update the user's stats in the database
    const updatedStats = await Stats.findOneAndUpdate(
      { user: id },
      { $inc: { points, studyTime } },
      { new: true }
    );

    // If stats for the user could not be found, return an error
    if (!updatedStats) {
      return res.status(404).json({ error: "User stats not found" });
    }

    // Return the updated stats
    res.status(200).json(updatedStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getuserstats,
  updateuserstats,
};
