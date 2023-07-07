import React, { useState } from "react";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
const socket = io.connect("http://localhost:4001");

const Chat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username != "" && room != "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="name"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="room id"
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join a Room</button>
      <ChatRoom socket={socket} username={username} room={room}></ChatRoom>
    </div>
  );
};

export default Chat;
