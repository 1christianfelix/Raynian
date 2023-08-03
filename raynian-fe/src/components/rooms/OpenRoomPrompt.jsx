import React, { useEffect, useState } from "react";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom, setUserInfo } from "../../slices/roomSlice";
import { joinRoom } from "../socket/socketConnection";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";

const OpenRoomPrompt = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isPublic, setIsPublic] = useState(true);

  const handlePublicToggle = () => {
    setIsPublic((prevIsPublic) => !prevIsPublic);
  };

  const handleCreateRoom = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/room/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: userInfo.user._id,
          username: userInfo.user.username,
          roomSettings: {},
          public: isPublic,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col rounded-3xl bg-white px-[30px] py-10">
      <div className="mb-4">
        <div className="text-center text-2xl">
          Open up your room for others to join!
        </div>
        <div>
          <div className="text-center text-sm italic">
            {userInfo.user._id === "guest" ? (
              <>
                (<span className="">You are not signed in</span>. Joining as{" "}
                <span className="text-sm font-medium italic text-blue-700">
                  {userInfo.user.username})
                </span>
              </>
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

      <div className="flex flex-col items-center justify-center">
        <label htmlFor="privateCheckbox" className="flex items-center">
          <input
            type="checkbox"
            id="privateCheckbox"
            checked={isPublic}
            onChange={handlePublicToggle}
            className="mr-2"
          />
          <span className="text-lg font-medium">
            Private <span className="text-base">(invite only)</span>
          </span>
        </label>
        <button
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleCreateRoom}
        >
          Start Live Session
        </button>
      </div>
    </div>
  );
};

export default OpenRoomPrompt;
