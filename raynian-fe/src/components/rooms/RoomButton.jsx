import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { useSelector } from "react-redux";

const RoomButton = () => {
  const { roomId } = useSelector((state) => state.room);
  const { toggleJoinRoomPrompt, toggleOpenRoomPrompt, toggleLeaveRoomPrompt } =
    useContext(ModalContext);

  return (
    <div className="mt-4">
      {roomId == null && (
        <button
          onClick={toggleOpenRoomPrompt}
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Open your room
        </button>
      )}

      <button
        onClick={toggleJoinRoomPrompt}
        className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Join a room
      </button>
      {roomId != null && (
        <button
          onClick={toggleLeaveRoomPrompt}
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Leave room
        </button>
      )}
    </div>
  );
};

export default RoomButton;
