import React from "react";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../Timer";
import ProfileGrid from "../ProfileGrid";
import sushi from "../../assets/temp_pfp/sushi.jpg";
import boba from "../../assets/temp_pfp/boba.jpg";
import avocado from "../../assets/temp_pfp/avocado.jpg";

const Dashboard = () => {
  const profiles = [sushi, avocado, boba]; // Add more profiles if needed
  return (
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
  );
};

export default Dashboard;
