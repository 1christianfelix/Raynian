const socketStore = require("../socketServerStores/socketStore");

const joinRoomHandler = async (socket, data) => {
  const io = socketStore.getSocketServerInstance();
  const socketId = socket.id;
  const user = data.user;
  const roomId = data.roomId;

  console.log(user);
  user["socketId"] = socketId;

  socketStore.roomsLive.joinRoom({
    user: user,
    roomId: roomId,
  });

  io.to(data.roomId).emit(
    "room-chat-log",
    socketStore.roomChat.sendRoomMessage({
      message: `${user.username} has connected!`,
    })
  );

  io.to(data.roomId).emit(
    "room-participants",
    socketStore.roomsLive.getRoomParticipants(data.room)
  );
};

module.exports = joinRoomHandler;
