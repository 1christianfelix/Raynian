const socketStore = require("./socketServerStores/socketStore");
const { Server } = require("socket.io");
const joinRoomHandler = require("./socketHandlers/joinRoomHandler");
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
    socket.emit("socketId", socket.id);

    // Joining a room
    socket.on("join-room", (data) => {
      socket.join(data.roomId);
      joinRoomHandler(socket, data);
      console.log(
        `Socket ID ${socket.id} is connected to rooms:`,
        socket.rooms
      );
    });

    // Leaving a room
    socket.on("leave-room", (roomId) => {
      console.log(
        `--Socket ID ${socket.id} is connected to rooms:`,
        socket.rooms
      );
      console.log("leaving room");
      socket.leave(roomId);
      // leaveRoomHandler(socket, roomId);
      console.log(
        `----Socket ID ${socket.id} is now connected to rooms:`,
        socket.rooms
      );
    });

    // Sending chat message
    socket.on("send-room-chat", (data) => {
      console.log(data);
      sendRoomMessageHandler(data);
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
