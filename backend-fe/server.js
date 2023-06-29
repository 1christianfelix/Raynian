require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/user/auth", userAuthRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to DB", "running on", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
