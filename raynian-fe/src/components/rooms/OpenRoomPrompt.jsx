import React, { useEffect, useState } from "react";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom, setUserInfo } from "../../slices/roomSlice";
import { joinRoom } from "../socket/socketConnection";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";

const OpenRoomPrompt = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleToggle = () => {
    setIsPrivate((prevIsPrivate) => !prevIsPrivate);
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
            checked={isPrivate}
            onChange={handleToggle}
            className="mr-2"
          />
          <span className="text-lg font-medium">Private</span>
        </label>
        <button className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white">
          Start Live Session
        </button>
      </div>
    </div>
  );
};

export default OpenRoomPrompt;
