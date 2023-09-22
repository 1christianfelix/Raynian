import React, { useEffect, useRef, useState } from "react";
import { generateUniqueUserNoCheck } from "../../helpers/generateUser";
import { useDispatch, useSelector } from "react-redux";
import { generateGuestCredentials } from "../../slices/authSlice";
import { setRoomUser } from "../../slices/roomSlice";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../util/Timer";

import Chat from "../chat/ChatDisplay";
import RoomButton from "../rooms/RoomButton";
import ParticipantList from "../rooms/ParticipantList";
import Timer2 from "../timer/Timer2";
import ParticipantListTest from "./ParticipantListTest";
import Nav from "../navigation/Nav";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { roomId } = useSelector((state) => state.room);

  const [currUser, setCurrUser] = useState("");

  const dispatch = useDispatch();

  // handle guest info
  useEffect(() => {
    if (userInfo === null) {
      dispatch(generateGuestCredentials());
    }
    dispatch(setRoomUser());
  }, [userInfo]);

  return (
    // BUG: adding relative to parent div breaks userdropdown
    <div
      className="flex h-screen flex-col"
      style={{
        // backgroundImage: "url(https://wallpapercave.com/wp/wp6486565.jpg)",
        backgroundSize: "cover",
      }}
    >
      {/* <img
        className=" absolute -z-10"
        src="https://wallpapercave.com/wp/wp6486565.jpg"
        alt=""
      /> */}
      <Nav />
      <div className=" mx-16 mb-12 h-[100%] flex-grow overflow-hidden">
        <div className="inline-flex h-[100%] flex-col justify-between">
          <div className="flex flex-col justify-center">
            <Timer2 />
            {roomId && <ParticipantList />}
          </div>
          <div className="flex-grow  overflow-auto p-4">
            {roomId && <Chat />}
          </div>

          {/* <div className="col-span-2 border">
            <div className="l grid grid-flow-row grid-cols-4 place-items-center gap-4 p-10">
              <div className="h-56 w-56 bg-green-300"></div>
              <div className="h-56 w-56 bg-red-300"></div>
              <div className="h-56 w-56 bg-pink-300"></div>
              <div className="h-56 w-56 bg-blue-300"></div>
              <div className="h-56 w-56 bg-purple-300"></div>
              <div className="h-56 w-56 bg-green-300"></div>
              <div className="h-56 w-56 bg-yellow-300"></div>
              <div className="h-56 w-56 bg-orange-300"></div>
              <div className="h-56 w-56 bg-emerald-300"></div>
              <div className="h-56 w-56 bg-amber-300"></div>
              <div className="h-56 w-56 bg-indigo-300"></div>
            </div>
          </div> */}
        </div>

        {/* <ParticipantListTest></ParticipantListTest> */}
      </div>
    </div>
  );
};

export default Dashboard;
