import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const RoomButton = () => {
  const { toggleJoinRoomPrompt } = useContext(ModalContext);

  return (
    <div className="mt-4">
      <button
        onClick={toggleJoinRoomPrompt}
        className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Open your room
      </button>
      <button
        onClick={toggleJoinRoomPrompt}
        className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Join a room
      </button>
    </div>
  );
};

export default RoomButton;
