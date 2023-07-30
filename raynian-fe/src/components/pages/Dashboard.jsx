import React from "react";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../util/Timer";
// import sushi from "../../assets/temp_pfp/sushi.jpg";
// import boba from "../../assets/temp_pfp/boba.jpg";
// import avocado from "../../assets/temp_pfp/avocado.jpg";

import ChatBox from "../rooms/Chatbox";
import RoomButton from "../rooms/RoomButton";

const Dashboard = () => {
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
        <ChatBox />
      </div>
    </div>
  );
};

export default Dashboard;
