import React, { useEffect, useState } from "react";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom, setUserInfo } from "../../slices/roomSlice";
import { joinRoom } from "../socket/socketConnection";

const OpenRoomPrompt = () => {
  const [roomId, setRoomId] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(null);

  const dispatch = useDispatch();
  const { roomID } = useSelector((state) => state.room);

  const handleRoomInputChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleSubmit = () => {
    if (roomId.length !== 0) {
      console.log("test");
      socketServerConnect();
      handleJoinRoom();
    }
  };

  const handleJoinRoom = async () => {
    setUserDetails({
      _id: userInfo.user._id,
      username: userInfo.user.username,
    });

    // Wrap the dispatch calls in Promises
    const setUserInfoPromise = dispatch(setUserInfo(userDetails));
    const connectToRoomPromise = dispatch(connectToRoom(roomId));

    // Wait for both Promises to resolve using Promise.all
    await Promise.all([setUserInfoPromise, connectToRoomPromise]);
  };

  useEffect(() => {
    if (roomId.length !== 0)
      joinRoom({
        room: roomID,
        user: userDetails,
      });
  }, [userDetails]);
  return (
    <div className="flex flex-col rounded-3xl bg-white px-[30px] py-10">
      <div className="mb-4 text-center text-2xl">Join a Room</div>
      <div className="text-center">
        {userInfo.user._id === "guest" ? (
          <>
            You are not signed in. Joining as{" "}
            <span className="text-lg font-medium italic text-blue-700">
              {userInfo.user.username}
            </span>{" "}
          </>
        ) : (
          <>
            Joining as{" "}
            <span className="text-lg font-medium italic text-blue-700">
              {userInfo.user.username}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          name="roomId"
          value={roomId}
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

export default OpenRoomPrompt;
