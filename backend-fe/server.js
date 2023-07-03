require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const userOauth = require("./routes/auth");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
// change cors usage logic for production
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    name: "jwt",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRoutes);
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/auth", userOauth);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    passportConfig(passport);
    app.listen(process.env.PORT, () => {
      console.log("connected to DB", "running on", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
