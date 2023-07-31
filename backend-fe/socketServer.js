const socketStore = require("./socketServerStores/socketStore");
const joinRoomHandler = require("./socketHandlers/joinRoomHandler");
const { Server } = require("socket.io");

const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  socketStore.setSocketServerInstance(io);

  io.on("connection", (socket) => {
    console.log("User:", socket.id);

    socket.on("join-room", (data) => {
      socket.join(data.room);
      console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
      joinRoomHandler(data);
      io.to(data.room).emit(
        "room-participants",
        socketStore.roomsLive.getRoomParticipants(data.room)
      );
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

module.exports = {
  registerSocketServer,
};
