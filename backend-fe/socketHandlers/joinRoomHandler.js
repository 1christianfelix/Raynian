const socketStore = require("../socketServerStores/socketStore");

const joinRoomHandler = async (socket, data) => {
  const io = socketStore.getSocketServerInstance();
  const socketId = socket.id;
  const user = data.user;
  const room = data.room;

  console.log(user);
  user["socketId"] = socketId;

  socketStore.roomsLive.joinRoom({
    user: user,
    room: room,
  });

  io.to(data.room).emit(
    "room-chat-log",
    socketStore.roomChat.sendRoomMessage({
      message: `${user.username} has connected!`,
    })
  );
};

module.exports = joinRoomHandler;
