import React, { useEffect, useState } from "react";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom } from "../../slices/roomSlice";
import { joinRoom, leaveRoom } from "../socket/socketConnection";
import { FiRefreshCcw } from "react-icons/fi";
import { generateGuestCredentials } from "../../slices/authSlice";

const JoinRoomPrompt = () => {
  const [room, setRoom] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState(null);

  console.log(userInfo);

  const dispatch = useDispatch();
  const { roomId } = useSelector((state) => state.room);

  const handleRoomInputChange = (event) => {
    setRoom(event.target.value);
  };

  const handleSubmit = () => {
    // to avoid changing socketId upon room changes
    if (roomId === null) {
      socketServerConnect();
    }

    if (room.length !== 0) {
      console.log("test");
      handleJoinRoom();
    }
  };

  const handleJoinRoom = () => {
    if (roomId !== null) {
      console.log("---------");
      leaveRoom(roomId);
      // dispatch(connectToRoom(null));
    }
    // Wrap the dispatch calls in Promises
    dispatch(connectToRoom(room));

    // Wait for both Promises to resolve using Promise.all

    joinRoom({
      roomId: room,
      user: {
        _id: userInfo.user._id,
        username: userInfo.user.username,
        profilePicture: userInfo.user.profilePicture,
        timer: userInfo.user.timer,
      },
    });
  };

  const refreshUsername = () => {
    dispatch(generateGuestCredentials());
  };

  return (
    <div className="flex w-[450px] flex-col rounded-3xl bg-white px-[30px] py-10">
      <div className="mb-4">
        <div className="text-center text-2xl">Join a room!</div>
        <div>
          <div className="text-center text-sm italic">
            {userInfo.user._id === "guest" ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <div>
                  (<span className="">You are not signed in. </span>Joining as{" "}
                  <span className="text-sm font-medium italic text-blue-700">
                    {userInfo.user.username}
                  </span>
                  )
                </div>
                <FiRefreshCcw
                  className="cursor-pointer"
                  onClick={refreshUsername}
                />
              </div>
            ) : (
              <>
                (Joining as{" "}
                <span className="text-sm font-medium italic text-blue-700">
                  {userInfo.user.username})
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          name="room"
          value={room}
          onChange={handleRoomInputChange}
          placeholder="Enter room ID"
          className="rounded-md border border-gray-400 px-4 py-2"
        />
        <button
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleSubmit}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPrompt;
