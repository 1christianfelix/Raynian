const socketStore = require("../socketServerStores/socketStore");

const updateParticipantTimerHandler = (socketId, roomId) => {
  const io = socketStore.getSocketServerInstance();

  roomId = roomId || findRoomId(socketId);
};

module.exports = updateParticipantTimerHandler;
