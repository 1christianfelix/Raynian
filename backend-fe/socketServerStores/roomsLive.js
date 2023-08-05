const util = require("util");

const roomsLive = {};
// const roomMessages = [];

const joinRoom = ({ socketID, room, user }) => {
  console.log(room, "roomslive before: ", roomsLive);
  if (roomsLive[room]) {
    roomsLive[room].participants.push(user);
  } else {
    roomsLive[room] = { participants: [user] };
  }
  console.log("joinRoom function:");
  console.log(user);
  console.log("roomslive after: ", roomsLive);
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
