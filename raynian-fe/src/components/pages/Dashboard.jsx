import React, { useState } from "react";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../util/Timer";
import ProfileGrid from "../util/ProfileGrid";
import sushi from "../../assets/temp_pfp/sushi.jpg";
import boba from "../../assets/temp_pfp/boba.jpg";
import avocado from "../../assets/temp_pfp/avocado.jpg";
import BgCustomizerMenu from "../ui/background-customizer/BgCustomizerMenu";
import Draggable from "react-draggable";
import { BGCustomContext } from "../../context/BGCustomContext";

// Refactor socket and chat stuff into their own components in future iteration
import { socketServerConnect } from "../socket/socketConnection";
import ChatBox from "../room-chat/Chatbox";
import { useDispatch } from "react-redux";
import { connectToRoom, updateParticipants } from "../../slices/roomSlice";

const Dashboard = () => {
  const profiles = [sushi, avocado, boba]; // Add more profiles if needed
  const [user, setUser] = useState({ username: "", roomId: null });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
    // You can perform any additional logic here if needed before updating the state.
    // For now, we are simply updating the state with the entered username.
    // You may want to add validation or other checks depending on your use case.
    if (user.username.length > 1 && user.roomId != null) {
      console.log("test");
      socketServerConnect(user);
      handleJoinRoom();
    }
  };

  const handleJoinRoom = () => {
    const { username, roomId } = user;

    if (username.trim() === "" || roomId.trim() === "") {
      return;
    }

    // Dispatch the actions to update the roomID and add the participant
    dispatch(updateParticipants(username));
    dispatch(connectToRoom(roomId));
  };

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="text-center ">
          <p className="text-3xl">You're doing great!</p>
          <TimerProvider>
            <Timer />
          </TimerProvider>
        </div>
        {/* Create a username field and button here */}
        <div className="mt-4">
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="border border-gray-400 px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="roomId"
            value={user.roomId}
            onChange={handleInputChange}
            placeholder="Enter room ID"
            className="border border-gray-400 px-4 py-2 rounded-md ml-2"
          />
          <button
            onClick={handleSubmit}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Join room
          </button>
        </div>
        <ChatBox />
      </div>
    </div>
  );
};

export default Dashboard;
