const socketStore = require("../socketServerStores/socketStore");

const updateTimerData = (roomId, socketId, timerData) => {
  if (socketStore.roomsLive.roomsLive[roomId]) {
    const participants = socketStore.roomsLive.roomsLive[roomId].participants;

    // Find the index of the participant with the matching socketId
    const index = participants.findIndex(
      (participant) => participant.socketId === socketId
    );

    // If a participant with the given socketId is found
    if (index !== -1) {
      // Update the timer data for the found participant
      participants[index].timerData = timerData;
      return participants[index];
    }
  }

  // Return null if participant was not found
  return null;
};

const updateParticipantTimerHandler = (socketId, data) => {
  const io = socketStore.getSocketServerInstance();
  const roomId = data.roomId;
  const timerData = data.timerData;

  const updatedParticipant = updateTimerData(roomId, socketId, timerData);

  if (updatedParticipant) {
    console.log("updatedtimer", updatedParticipant);
    io.to(data.roomId).emit(
      "room-participants",
      socketStore.roomsLive.getRoomParticipants(data.roomId)
    );
  } else {
    console.log("Participant not found or room not found.");
  }
};

module.exports = updateParticipantTimerHandler;
