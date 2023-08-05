const socketStore = require("./socketServerStores/socketStore");
const joinRoomHandler = require("./socketHandlers/joinRoomHandler");
const { Server } = require("socket.io");
const sendRoomMessageHandler = require("./socketHandlers/sendRoomMessageHandler");

const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  socketStore.setSocketServerInstance(io);

  io.on("connection", (socket) => {
    console.log("User:", socket.id);

    // Joining a room
    socket.on("join-room", (data) => {
      socket.join(data.room);
      joinRoomHandler(socket, data);

      io.to(data.room).emit(
        "room-participants",
        socketStore.roomsLive.getRoomParticipants(data.room)
      );
    });

    // Sending chat message
    socket.on("send-room-chat", (data) => {
      console.log(data);
    });

    // Disconnect from room
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

module.exports = {
  registerSocketServer,
};
