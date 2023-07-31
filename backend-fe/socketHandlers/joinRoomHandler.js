const socketStore = require("../socketServerStores/socketStore");

const joinRoomHandler = async (data) => {
  const user = data.user;
  const room = data.room;

  socketStore.roomsLive.joinRoom({
    user: user,
    room: room,
  });
};

module.exports = joinRoomHandler;
