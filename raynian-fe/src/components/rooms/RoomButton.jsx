import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const RoomButton = () => {
  const { toggleRoomPrompt } = useContext(ModalContext);

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
