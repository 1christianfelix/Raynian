import React, { useState } from "react";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom, setUserInfo } from "../../slices/roomSlice";
import { generateUniqueUserNoCheck } from "../../helpers/generateUser";

const RoomPrompt = () => {
  const [user, setUser] = useState({ username: "", roomId: null });
  const { userInfo } = useSelector((state) => state.auth);
  let username = generateUniqueUserNoCheck();
  console.log(userInfo);
  console.log(username);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
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

    dispatch(setUserInfo(username));
    dispatch(connectToRoom(roomId));
  };
  return (
    <div
      className="py-10 px-[30px] flex flex-col bg-white rounded-3xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-center text-2xl mb-4">Join a Room</div>
      <div className="text-center">
        {userInfo === null ? (
          <>
            You are not signed in, Joining as{" "}
            <span className="italic text-lg font-medium text-blue-700">
              {username}
            </span>{" "}
            instead
          </>
        ) : (
          <>Joining as "{userInfo.user.username}"</>
        )}
      </div>
      <div>
        <input
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
          className="border border-gray-400 px-4 py-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default RoomPrompt;
