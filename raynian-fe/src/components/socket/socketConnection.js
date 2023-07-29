import io from "socket.io-client";

let socket = null;

export const socketServerConnect = (user) => {
  socket = io.connect("http://localhost:4001");
  console.log("test");
};
