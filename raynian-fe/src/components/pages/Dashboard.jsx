import React, { useState } from "react";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../util/Timer";
import ProfileGrid from "../util/ProfileGrid";
import sushi from "../../assets/temp_pfp/sushi.jpg";
import boba from "../../assets/temp_pfp/boba.jpg";
import avocado from "../../assets/temp_pfp/avocado.jpg";
import BgCustomizerMenu from "../ui/background-customizer/BgCustomizerMenu";
import Draggable from "react-draggable";
import { BGCustomContext } from "../../context/BGCustomContext";

import ChatBox from "../rooms/Chatbox";
import RoomButton from "../rooms/RoomButton";

const Dashboard = () => {
  const profiles = [sushi, avocado, boba]; // Add more profiles if needed

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
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
