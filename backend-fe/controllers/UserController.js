const User = require("../models/UserModel");
const Stats = require("../models/StatsModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

// get all users
const getusers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

// get a single user
const getuser = async (req, res) => {
  const { user } = req.params;

  // checking if the id being passed is a valid MongoDB type id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "user does not exist" });
  }

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

    const token = createToken(user._id);

    // Create the stats object and link it to the user
    const stats = new Stats({ user: user._id });
    await stats.save();

    // Update the user's stats reference
    user.stats = stats._id;
    await user.save();

    const newuser = await User.findById(user._id).populate("stats"); // replace 'stats' with the document referenced by 'stats'
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ newuser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email = null, username = null, password = null } = req.body;
  try {
    const user = await User.login(email, username, password);

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// logout
const logout = async (req, res) => {
  const { email = null, username = null, password = null } = req.body;
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a user

module.exports = {
  getuser,
  getusers,
  signup,
  login,
  logout,
};
