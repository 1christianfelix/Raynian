require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./API");
const passport = require("passport");
const passportConfig = require("./passport");
const cors = require("cors");
const http = require("http");
const { sessionMiddleware, wrap } = require("./middleware/sessionMiddleware");

const socketServer = require("./socketServer");

// express app
const app = express();

// setting up socket server
const server = http.createServer(app);
socketServer.registerSocketServer(server);

server.listen(process.env.SERVER_PORT, () => {
  console.log("server running");
});

// middleware
app.use(express.json());
// change cors usage logic for production
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(apiRoutes);

// DB start
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
