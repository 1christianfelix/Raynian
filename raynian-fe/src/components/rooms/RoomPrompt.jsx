import React, { useEffect, useRef, useState } from "react";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom, setUserInfo } from "../../slices/roomSlice";
import { generateUniqueUserNoCheck } from "../../helpers/generateUser";
import { joinRoom } from "../socket/socketConnection";

const RoomPrompt = () => {
  const [roomId, setRoomId] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(null);
  const usernameRef = useRef(generateUniqueUserNoCheck());

  console.log(userInfo);

  const dispatch = useDispatch();
  const { roomID, user } = useSelector((state) => state.room);

  const handleRoomInputChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleSubmit = () => {
    if (roomId.length != 0) {
      console.log("test");
      socketServerConnect();
      handleJoinRoom();
    }
  };

  const handleJoinRoom = async () => {
    if (userInfo == null) {
      setUserDetails({ _id: "guest", username: usernameRef.current });
    } else {
      setUserDetails({
        _id: userInfo.user._id,
        username: userInfo.user.username,
      });
    }
    // Wrap the dispatch calls in Promises
    const setUserInfoPromise = dispatch(setUserInfo(userDetails));
    const connectToRoomPromise = dispatch(connectToRoom(roomId));

    // Wait for both Promises to resolve using Promise.all
    await Promise.all([setUserInfoPromise, connectToRoomPromise]);
  };

  useEffect(() => {
    if (roomId.length != 0)
      joinRoom({
        room: roomID,
        user: userDetails,
      });
  }, [userDetails]);

  return (
    <div className="py-10 px-[30px] flex flex-col bg-white rounded-3xl">
      <div className="text-center text-2xl mb-4">Join a Room</div>
      <div className="text-center">
        {userInfo === null ? (
          <>
            You are not signed in. Joining as{" "}
            <span className="italic text-lg font-medium text-blue-700">
              {usernameRef.current}
            </span>{" "}
          </>
        ) : (
          <>
            Joining as{" "}
            <span className="italic text-lg font-medium text-blue-700">
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
          className="border border-gray-400 px-4 py-2 rounded-md"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSubmit}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default RoomPrompt;
