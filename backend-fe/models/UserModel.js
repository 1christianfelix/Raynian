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
    maxlength: 20,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stats: { type: mongoose.Schema.Types.ObjectId, ref: "Stats" },
  friends: [mongoose.Schema.Types.ObjectId],
  labels: [{ type: String, lowercase: true }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
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
    throw Error("Password is not strong enough");
  }

  if (username.length > 20) {
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
    throw Error("email or username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, username, password) {
  // validation
  if ((!email || !username) && !password) {
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
