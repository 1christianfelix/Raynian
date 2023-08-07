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
const joinRoom = ({ socketId, roomId, user }) => {
  if (roomsLive[roomId]) {
    roomsLive[roomId].participants.push(user);
  } else {
    roomsLive[roomId] = { participants: [user] };
  }
};

const getRoomParticipants = (roomId) => {
  console.log(roomsLive);
  // console.log(room);
  // console.log(roomsLive[room].participants);
  return roomsLive[roomId].participants;
};

module.exports = {
  joinRoom,
  getRoomParticipants,
};
