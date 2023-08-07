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

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
    <div className="">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center ">
          <p className="text-3xl">You're doing great!</p>
          <TimerProvider>
            <Timer />
          </TimerProvider>
        </div>
        {/* Create a username field and button here */}
        <RoomButton />
        <Chat />
        <ParticipantList />
      </div>
    </div>
  );
};

export default Dashboard;
