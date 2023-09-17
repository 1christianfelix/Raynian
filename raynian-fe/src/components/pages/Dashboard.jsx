import React, { useEffect, useRef, useState } from "react";
import { generateUniqueUserNoCheck } from "../../helpers/generateUser";
import { useDispatch, useSelector } from "react-redux";
import { generateGuestCredentials } from "../../slices/authSlice";
import { setRoomUser } from "../../slices/roomSlice";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../util/Timer";

import Chat from "../rooms/Chat";
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
    <div className="flex h-screen flex-col">
      <Nav />
      <div className=" mx-16 mb-12 flex-grow">
        <div className="grid h-[100%] grid-cols-3">
          <div>
            <div className="col-span-1 flex flex-col">
              <div className="flex w-[480px] flex-col justify-center">
                <Timer2 />
                <ParticipantList />
              </div>

              {/* Create a username field and button here */}
              {roomId && <Chat />}
            </div>
          </div>
          <div className="col-span-2 border">
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
          </div>
        </div>

        {/* <ParticipantListTest></ParticipantListTest> */}
      </div>
    </div>
  );
};

export default Dashboard;
