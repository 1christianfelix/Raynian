const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.SECRET,
  credentials: true,
  resave: false,
  saveUninitialized: false,
  name: "jwt",
});

const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

module.exports = { sessionMiddleware, wrap };
