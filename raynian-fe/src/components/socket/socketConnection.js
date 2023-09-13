import io from "socket.io-client";
import {
  updateParticipants,
  updateChat,
  updateSocketId,
} from "../../slices/roomSlice";
import store from "../../store";

let socket = null;

export const socketServerConnect = () => {
  socket = io.connect("http://localhost:4001");

  ////////////////////////
  //     Recievers     //
  ///////////////////////
  /*
    Recieves from:
    socketServer.js

    serves indicator for connection. attaches as field to user field in redux room state
  */
  socket.on("socketId", (socketId) => {
    store.dispatch(updateSocketId(socketId));
  });

  /*
    Recieves from:
    joinRoomHandler.js
  */
  socket.on("room-participants", (data) => {
    console.log("room-participants");
    store.dispatch(updateParticipants(data));
    console.log(data, " joined");
  });

  /*
    Recieves from:
    joinRoomHandler.js
  */
  socket.on("room-chat-log", (messages) => {
    console.log("room-chat-log");
    store.dispatch(updateChat(messages));
  });
};

/////////////////////
//     Senders     //
////////////////////

/**
 * Joins a room by emitting a socket event.
 *
 * @param {Object} data - The data object containing room and user information.
 * @param {string} data.roomId - The ID of the room to join.
 * @param {Object} data.user - Information about the user joining the room.
 * @param {string} data.user._id - The ID of the user.
 * @param {string} data.user.username - The username of the user.
 * @param {string} data.user.profilePicture - The profile picture of the user.
 * @returns {void}
 */
export const joinRoom = (data) => {
  console.log("joinRoom");
  socket.emit("join-room", data);
};

/**
 * Leaves the current room
 *
 * @param {string} data - data is the roomId
 */
export const leaveRoom = (data) => {
  console.log("leaveRoom");
  socket.emit("leave-room", data);
};

/**
 * Disconnects from the server
 *
 * @param {string} data - data is the roomId
 */
export const disconnect = (data) => {
  console.log("disconnected from socket server");
  socket.emit("disconnectRequest", data);
};

export const sendRoomChat = (data) => {
  console.log("send-room-chat");
  socket.emit("send-room-chat", data);
};

//////////////////////
//     Senders     //
/////////////////////

// Send data when timer status updates from isRunning isBreak isWork isPaused
// Send countdown if status change
export const updateTimerStatus = (timerData, roomId) => {
  const data = {
    timerData: timerData,
    roomId,
  };
  console.log("update-timer-status", data);
  socket.emit("update-timer-status", data);
};

export { socket };
