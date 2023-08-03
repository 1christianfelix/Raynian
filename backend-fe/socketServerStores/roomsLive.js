const util = require("util");

const roomsLive = new Map();
// const roomMessages = [];

const joinRoom = ({ socketID, room, user }) => {
  if (roomsLive.has(room)) {
    roomsLive.room.participants.push(user);
  } else {
    roomsLive[room] = { participants: [user] };
  }
  console.log("joinRoom function:");
  console.log(user);
  console.log(roomsLive); // Adjust depth as needed
};

const getRoomParticipants = (room) => {
  // console.log(room);
  // console.log(roomsLive[room].participants);
  return roomsLive[room].participants;
};

const sendRoomMessage = (message) => {
  console.log("message:");
  console.log(message);
  return message;
};

const getRoomMessages = () => {
  console.log("sending");
  // return roomMessages;
};

module.exports = {
  joinRoom,
  getRoomParticipants,
  sendRoomMessage,
  getRoomMessages,
};
