const roomsLive = new Map();

const joinRoom = ({ socketId, room, user }) => {
  if (roomsLive.has(room)) {
    roomsLive.room.participants.push(user);
  } else {
    roomsLive[room] = { participants: [user] };
  }
  console.log(roomsLive);
};

const getRoomParticipants = (room) => {
  console.log(room);
  return roomsLive[room].participants;
};

module.exports = {
  joinRoom,
  getRoomParticipants,
};
