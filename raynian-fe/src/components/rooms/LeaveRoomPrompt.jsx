import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { disconnectFromRoom } from "../../slices/roomSlice";
import { leaveRoom, disconnect } from "../socket/socketConnection";
import CloseModalButton from "../util/CloseModalButton";

const LeaveRoomPrompt = () => {
  const dispatch = useDispatch();
  const { roomId } = useSelector((state) => state.room);

  const handleLeaveRoom = () => {
    if (roomId !== null) {
      console.log("--------");
      disconnect(roomId);
      dispatch(disconnectFromRoom());
    }
  };
  return (
    <div
      className="relative flex w-[450px] flex-col rounded-3xl bg-neutral-50 px-[30px] py-10"
      onClick={(event) => event.stopPropagation()}
    >
      <CloseModalButton />
      <div className="mb-4">
        <div className="text-center text-2xl">Leave Room?</div>

        <button
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleLeaveRoom}
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveRoomPrompt;
