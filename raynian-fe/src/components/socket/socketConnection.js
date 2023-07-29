import io from "socket.io-client";

let socket = null;

export const socketServerConnect = (user) => {
  socket = io.connect("http://localhost:4001");
  console.log("test");
};

export const joinRoom = (data) => {
  console.log(data);
  socket.emit("join-room", data);
};

export const sendRoomChat = (data) => {
  console.log(data);
  socket.emit("room-chat", data);
};
