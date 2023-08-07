const socketStore = require("../socketServerStores/socketStore");

const emptyRoomCheckHandler = (io, roomId) => {
  console.log(socketStore.roomsLive.roomsLive[roomId].participants.length);
  if (socketStore.roomsLive.roomsLive[roomId].participants.length == 0) {
    console.log("empty");
    socketStore.roomsLive.deleteRoom(roomId);
  } else {
    console.log("room not empty yet");
    io.to(roomId).emit(
      "room-participants",
      socketStore.roomsLive.getRoomParticipants(roomId)
    );
  }
};

const removeParticipantHandler = (socket, roomId) => {
  const io = socketStore.getSocketServerInstance();
  const socketId = socket.id;
  if (socketStore.roomsLive.roomsLive[roomId]) {
    socketStore.roomsLive.roomsLive[roomId].participants =
      socketStore.roomsLive.roomsLive[roomId].participants.filter(
        (participant) => participant.socketId !== socketId
      );
  }

  emptyRoomCheckHandler(io, roomId);
};

module.exports = removeParticipantHandler;
