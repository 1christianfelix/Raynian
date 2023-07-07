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
const http = require("http");
const { Server } = require("socket.io");

// express app
const app = express();

// setting up socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log("User:", socket.id);

  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("messageBody", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
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

// routes
app.use("/api/user", userRoutes);
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/auth", userOauth);

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
