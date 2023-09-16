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
      <div className=" flex-grow ">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center ">
            <TimerProvider>
              <Timer />
            </TimerProvider>
          </div>
          {/* Create a username field and button here */}
          <RoomButton />
          {roomId && <Chat />}
          <ParticipantList />
        </div>
        <Timer2 />
        {/* <ParticipantListTest></ParticipantListTest> */}
      </div>
    </div>
  );
};

export default Dashboard;
