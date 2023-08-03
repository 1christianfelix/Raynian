import React, { useEffect, useRef } from "react";
import { generateUniqueUserNoCheck } from "../../helpers/generateUser";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  generateGuestCredentials,
} from "../../slices/authSlice";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../util/Timer";
// import sushi from "../../assets/temp_pfp/sushi.jpg";
// import boba from "../../assets/temp_pfp/boba.jpg";
// import avocado from "../../assets/temp_pfp/avocado.jpg";

import Chat from "../rooms/Chat";
import RoomButton from "../rooms/RoomButton";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo === null) {
      dispatch(generateGuestCredentials());
    }
  });

  return (
    <div>
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
      </div>
    </div>
  );
};

export default Dashboard;
