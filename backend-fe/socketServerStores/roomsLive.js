const util = require("util");

// active rooms and information of each room
const roomsLive = {};
// const roomMessages = [];

/**
 * Add a user to the room in server storage.
 *
 * @param {String} socketID, - The socket id of connected user.
 * @param {String} room - The ID of the room to join.
 * @param {Object} user - Information about the user joining the room.
 * @param {string} user._id - The ID of the user.
 * @param {string} user.username - The username of the user.
 * @returns {void}
 */
const joinRoom = ({ socketID, room, user }) => {
  if (roomsLive[room]) {
    roomsLive[room].participants.push(user);
  } else {
    roomsLive[room] = { participants: [user] };
  }
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
