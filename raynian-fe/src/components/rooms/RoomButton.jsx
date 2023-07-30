import React, { useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch } from "react-redux";
import { connectToRoom, setUserInfo } from "../../slices/roomSlice";

const RoomButton = () => {
  const [user, setUser] = useState({ username: "", roomId: null });
  const { toggleRoomPrompt } = useContext(ModalContext);

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
    <div className="mt-4">
      <button
        onClick={toggleRoomPrompt}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Join room
      </button>
    </div>
  );
};

export default RoomButton;
