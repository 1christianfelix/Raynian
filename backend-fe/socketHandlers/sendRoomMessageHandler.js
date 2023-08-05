const socketStore = require("../socketServerStores/socketStore");

const sendRoomMessageHandler = async (data) => {
  const io = socketStore.getSocketServerInstance();
  const message = { message: data.message };
  io.to(data.roomId).emit(
    "room-chat-log",
    socketStore.roomChat.sendRoomMessage(message)
  );
};

module.exports = sendRoomMessageHandler;
