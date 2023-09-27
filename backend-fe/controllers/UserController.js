// Import necessary modules
const User = require("../models/UserModel");
const Stats = require("../models/StatsModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");

/* JWT Token Creation */
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

/* User Retrieval Operations */
// Get all users from the database
const getusers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

// Get a specific user by ID from the database
const getuser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "user does not exist" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  await user.populate("stats");

  res.status(200).json(user);
};

/* Username and Email Validation Operations */
// Check username availability and validity
const usernameChecker = async (req, res) => {
  const { username } = req.body;
  const alphanumericOptions = { ignore: "-._" };
  const findUsername = await User.findOne({ username: username });
  if (
    username.length > 25 ||
    username.length < 4 ||
    !validator.isAlphanumeric(username, "en-US", alphanumericOptions) ||
    findUsername
  ) {
    res.json({
      msg: "Username already exist",
      valid_display: true,
      error: false,
    });
  } else {
    res.json({ msg: "Username available", valid_display: true, error: true });
  }
};

// Check if email is valid and available
const emailChecker = async (req, res) => {
  const { email } = req.body;
  if (!validator.isEmail(email))
    return res.json({ msg: "Email Required", error: false });
  const findEmail = await User.findOne({ email: email });
  if (findEmail) {
    res.json({ msg: "Email already exist", error: false });
  } else {
    res.json({ msg: "Email is available", error: true });
  }
};

/* User Authentication Operations */
// User signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(email, username, password);
    const token = createToken(user._id);

    // adding default pfp
    pfpRandomizer = Math.floor(Math.random() * 3) + 1;
    switch (pfpRandomizer) {
      case 1:
        user.profilePicture =
          "https://img.freepik.com/free-vector/cute-panda-sipping-boba-milk-tea-cartoon-icon-illustration-animal-food-icon-concept-isolated-flat-cartoon-style_138676-2173.jpg";
        break;
      case 2:
        user.profilePicture =
          "https://i.pinimg.com/736x/ef/26/df/ef26df0ce4f41d74cb48a4f139504619.jpg";
        break;
      case 3:
        user.profilePicture =
          "https://img.freepik.com/free-vector/cute-dinosaur-playing-guitar-music-cartoon-vector-icon-illustration-animal-technology-icon-isolated_138676-4729.jpg";
        break;
      default:
        user.profilePicture =
          "https://img.freepik.com/free-vector/cute-dinosaur-playing-guitar-music-cartoon-vector-icon-illustration-animal-technology-icon-isolated_138676-4729.jpg";
        break;
    }

    // Create stats for user and update user's stats reference
    const stats = new Stats({ user: user._id });
    console.log(stats);
    await stats.save();
    console.log(stats);
    user.stats = stats._id;
    await user.save();
    await user.populate("stats").execPopulate();

    // Set jwt in the cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    req.session.user = {
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      stats: user.stats,
      bio: user.bio,
      tasks: user.tasks,
    };
    // console.log(req.session);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login
const login = async (req, res) => {
  const { email = null, username = null, password = null } = req.body;

  try {
    const user = await User.login(email, username, password);
    const token = createToken(user._id);

    // Set jwt in the cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    await user.populate("stats");
    req.session.user = {
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      stats: user.stats,
      bio: user.bio,
      tasks: user.tasks,
    };
    // console.log(req.session);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User logout
const logout = async (req, res) => {
  const { email = null, username = null, password = null } = req.body;

  try {
    // Clear jwt from the cookie
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getuser,
  getusers,
  signup,
  login,
  logout,
  usernameChecker,
  emailChecker,
};
