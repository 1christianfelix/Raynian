const socketStore = require("../socketServerStores/socketStore");

const joinRoomHandler = async (socket, io) => {
  const user = socket.user;
  const room = socket.roomId;

  socketStore.roomsLive.joinRoom({
    socketId: socket.id,
    user: user,
    room: room,
  });
};

module.exports = joinRoomHandler;
