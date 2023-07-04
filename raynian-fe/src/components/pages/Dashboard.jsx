import React from "react";
import { TimerProvider } from "../../context/TimerContext";
import Timer from "../util/Timer";
import ProfileGrid from "../util/ProfileGrid";
import sushi from "../../assets/temp_pfp/sushi.jpg";
import boba from "../../assets/temp_pfp/boba.jpg";
import avocado from "../../assets/temp_pfp/avocado.jpg";

const Dashboard = () => {
  const profiles = [sushi, avocado, boba]; // Add more profiles if needed
  return (
    <div className="h-[60%] flex items-center justify-center flex-col">
      <div className="text-center ">
        <TimerProvider>
          <Timer />
        </TimerProvider>
      </div>
      <ProfileGrid profiles={profiles} />
    </div>
  );
};

export default Dashboard;
