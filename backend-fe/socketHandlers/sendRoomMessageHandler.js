const socketStore = require("../socketServerStores/socketStore");

const sendRoomMessageHandler = async (data) => {
  const io = socketStore.getSocketServerInstance();
  io.to(data.roomId).emit(
    "room-chat-log",
    socketStore.roomChat.sendRoomMessage(data)
  );
};

module.exports = sendRoomMessageHandler;
