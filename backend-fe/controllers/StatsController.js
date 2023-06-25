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

module.exports = {
  getuserstats,
};
