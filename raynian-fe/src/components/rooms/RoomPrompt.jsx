import React, { useState } from "react";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch } from "react-redux";
import { connectToRoom, setUserInfo } from "../../slices/roomSlice";

const RoomPrompt = () => {
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
    dispatch(setUserInfo(username));
    dispatch(connectToRoom(roomId));
  };
  return (
    <div
      className="py-10 flex flex-row bg-white w-[475px] rounded-3xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pl-[60px] pr-[60px] w-full mx-auto mb-0 overflow-visible h-[400px] flex items-center">
        {/* <input
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
        /> */}
      </div>
    </div>
  );
};

export default RoomPrompt;
