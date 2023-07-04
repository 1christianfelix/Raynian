import React from "react";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../util/Timer";
import ProfileGrid from "../util/ProfileGrid";
import sushi from "../../assets/temp_pfp/sushi.jpg";
import boba from "../../assets/temp_pfp/boba.jpg";
import avocado from "../../assets/temp_pfp/avocado.jpg";
import BgCustomizerMenu from "../ui/background-customizer/BgCustomizerMenu";
import { BGCustomContext } from "../../context/BGCustomContext";

const Dashboard = () => {
  const profiles = [sushi, avocado, boba]; // Add more profiles if needed
  return (
    <div>
      <div className="h-[60%] flex items-center justify-center flex-col">
        <div className="text-center ">
          <p className="text-3xl">You're doing great!</p>
          <TimerProvider>
            <Timer />
          </TimerProvider>
          <p className="text-3xl">Sessions completed today:</p>
          <span className="text-3xl">2</span>
        </div>
        <ProfileGrid profiles={profiles} />
      </div>
      <div className="translate-x-12">
        <BgCustomizerMenu></BgCustomizerMenu>
      </div>
    </div>
  );
};

export default Dashboard;
