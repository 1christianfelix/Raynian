import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { connectToRoom, updateParticipants } from "../../slices/roomSlice";
import store from "../../store";

let socket = null;

export const socketServerConnect = (user) => {
  socket = io.connect("http://localhost:4001");
  console.log("test");

  socket.on("room-participants", (data) => {
    store.dispatch(updateParticipants(data));
    console.log(data, " joined");
  });
};

export const joinRoom = (data) => {
  console.log(data);
  socket.emit("join-room", data);
};

export const sendRoomChat = (data) => {
  console.log(data);
  socket.emit("room-chat", data);
};
