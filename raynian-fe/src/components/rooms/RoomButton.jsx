import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const RoomButton = () => {
  const { toggleRoomPrompt } = useContext(ModalContext);

  return (
    <div className="mt-4">
      <button
        onClick={toggleRoomPrompt}
        className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Join room
      </button>
    </div>
  );
};

export default RoomButton;
