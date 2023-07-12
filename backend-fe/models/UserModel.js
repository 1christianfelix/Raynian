const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    maxlength: 25,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    // required: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    maxlength: 150,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  stats: { type: mongoose.Schema.Types.ObjectId, ref: "Stats" },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  labels: [{ type: String, lowercase: true }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
});

// static signup method
userSchema.statics.signup = async function (email, username, password) {
  // validation
  if (!email || !username || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Not a valid email");
  }

  const passwordCriteria = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  };

  if (!validator.isStrongPassword(password, passwordCriteria)) {
    throw Error(
      "The password requires capital and lowercase letters, numbers, and symbols"
    );
  }

  if (username.length > 25) {
    throw Error("Username exceeds the maximum length of 20 characters");
  }

  const alphanumericOptions = {
    ignore: "-._", // Ignore characters "-", ".", and "_"
  };

  if (!validator.isAlphanumeric(username, "en-US", alphanumericOptions)) {
    throw Error("Username must be alphanumeric (allowing '-', '.', and '_')");
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });
  if (emailExists || usernameExists) {
    throw Error("Email or Username already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, username, password) {
  // validation
  const login = email || username;
  if (!login || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (!user) {
    throw Error("Username or Email is invalid");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
