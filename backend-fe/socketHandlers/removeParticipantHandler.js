const socketStore = require("../socketServerStores/socketStore");

const emptyRoomCheckHandler = (io, roomId) => {
  if (socketStore.roomsLive.roomsLive[roomId]) {
    if (socketStore.roomsLive.roomsLive[roomId].participants.length == 0) {
      socketStore.roomsLive.deleteRoom(roomId);
      console.log("current rooms: ", socketStore.roomsLive.roomsLive);
    } else {
      console.log("room not empty yet");
      io.to(roomId).emit(
        "room-participants",
        socketStore.roomsLive.getRoomParticipants(roomId)
      );
    }
  }
};

const findRoomId = (socketId) => {
  for (const roomId in socketStore.roomsLive.roomsLive) {
    const participants = socketStore.roomsLive.roomsLive[roomId].participants;
    const participantWithSocketId = participants.find(
      (participant) => participant.socketId === socketId
    );
    if (participantWithSocketId) {
      return roomId;
    }
  }
};

const removeParticipantHandler = (socketId, roomId) => {
  const io = socketStore.getSocketServerInstance();

  if (socketStore.roomsLive.roomsLive[roomId]) {
    socketStore.roomsLive.roomsLive[roomId].participants =
      socketStore.roomsLive.roomsLive[roomId].participants.filter(
        (participant) => participant.socketId !== socketId
      );
  }

  emptyRoomCheckHandler(io, roomId);
};

module.exports = removeParticipantHandler;
