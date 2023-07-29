require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./API");
const passport = require("passport");
const passportConfig = require("./passport");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { sessionMiddleware, wrap } = require("./middleware/sessionMiddleware");

// express app
const app = express();

// setting up socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.use(wrap(sessionMiddleware));
io.on("connection", (socket) => {
  console.log("User:", socket.id);
  console.log("session:", socket.request.session);
  // console.log("socket:", socket);

  socket.on("join-room", (data) => {
    const { room, userInfo } = data;
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);

    // Emit an event to notify other users in the room about the connected user's profile picture
    // io.to(room).emit("user_connected", {
    //   profilePicture: userInfo.user.profilePicture,
    // });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    // Emit an event to notify other users in the room about the disconnected user's profile picture
    socket.rooms.forEach((room) => {
      io.to(room).emit("user_disconnected", {
        profilePicture: "USER_PROFILE_PICTURE",
      });
    });
  });
});

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
