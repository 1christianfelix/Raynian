const User = require("../models/UserModel");
const Stats = require("../models/StatsModel");
const mongoose = require("mongoose");

// get all users
const getusers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

// get a single user
const getuser = async (req, res) => {
  const { id } = req.params;

  // checking if the id being passed is a valid MongoDB type id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "user does not exist" });
  }

  const user = await User.findById(id).populate("stats");

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // add doc to db
  try {
    const user = await User.signup(email, username, password);

    // Create the stats object and link it to the user
    const stats = new Stats({ user: user._id });
    await stats.save();

    // Update the user's stats reference
    user.stats = stats._id;
    await user.save();

    const newuser = await User.findById(user._id).populate("stats"); // replace 'stats' with the document referenced by 'stats'

    res.status(200).json(newuser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login
const login = async (req, res) => {
  res.json({ msg: "logged in" });
};

// delete a user

// update a user

module.exports = {
  getuser,
  getusers,
  signup,
  login,
};
