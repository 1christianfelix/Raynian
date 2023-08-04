import { socket } from "./socketConnection";
import { JoinRoomData, User } from "./socketInterfaces";

export const joinRoom = (data: JoinRoomData) => {
  console.log("joinRoom");
  console.log(data);
  socket.emit("join-room", data);
};
