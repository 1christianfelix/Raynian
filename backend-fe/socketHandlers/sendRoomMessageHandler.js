const socketStore = require("../socketServerStores/socketStore");

const sendRoomMessageHandler = async (data) => {
  const io = socketStore.getSocketServerInstance();
  const message = data.message;
  io.to(data.room).emit(
    "room-messages",
    socketStore.roomsLive.sendRoomMessage(message)
  );
};

module.exports = sendRoomMessageHandler;
