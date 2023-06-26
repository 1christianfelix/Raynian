const User = require("../models/UserModel");
const Stats = require("../models/StatsModel");
const mongoose = require("mongoose");

const getuserstats = async (req, res) => {
  const { id } = req.params;

  // checking if the id being passed is a valid MongoDB type id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "user does not exist" });
  }

  const userStats = await Stats.find({ user: id }).exec();

  res.status(200).json(userStats);
};

const updateuserstats = async (req, res) => {
  const { id } = req.params;
  let { points, studyTime } = req.body;

  // Checking if the id being passed is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  // Set default values of 0 if points or studyTime are not provided
  points = points || 0;
  studyTime = studyTime || 0;

  try {
    // Find the specific user's stats and update the points and studyTime fields
    const updatedStats = await Stats.findOneAndUpdate(
      { user: id },
      { $inc: { points, studyTime } },
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
  getuserstats,
  updateuserstats,
};
