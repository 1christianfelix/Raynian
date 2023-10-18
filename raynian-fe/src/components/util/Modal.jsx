import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import AfkCheckPage from "../pages/AfkCheckPage";
import JoinRoomPrompt from "../rooms/JoinRoomPrompt";
import OpenRoomPrompt from "../rooms/OpenRoomPrompt";
import LeaveRoomPrompt from "../rooms/LeaveRoomPrompt";
import TimerSettings from "../timer/TimerSettings";
import BackgroundSettings from "../ui/background-customizer/BackgroundSettings";
import UserStats from "../stats/UserStats";
import DailiesDashboard from "../dailies/DailiesDashboard";
import ProfilePage from "../profile/ProfilePage";

export default function Modal(props) {
  const { type, setType, userStatsParams } = useContext(ModalContext);

  let content = null;

  const handleContent = () => {
    setType(null);
  };

  if (type) {
    content = (
      <div className="absolute flex h-screen w-[100%] items-center justify-center">
        {/* <div className="absolute right-4 top-4 z-[100]">
          <div onClick={handleContent} className="cursor-pointer">
            <RxCross1 />
          </div>
        </div> */}
        <div
          className="relative h-[100%] w-[100%] z-[60]  flex items-center justify-center"
          onClick={handleContent}
        >
          {type === "login" && <LoginPage />}
          {type === "signup" && <SignupPage />}
          {type === "afk" && <AfkCheckPage />}
          {type === "joinRoomPrompt" && <JoinRoomPrompt />}
          {type === "openRoomPrompt" && <OpenRoomPrompt />}
          {type === "leaveRoomPrompt" && <LeaveRoomPrompt />}
          {type === "timerSettings" && <TimerSettings />}
          {type === "backgroundSettings" && <BackgroundSettings />}
          {type === "userStats" && <UserStats {...userStatsParams} />}
          {type === "dailiesDashboard" && <DailiesDashboard />}
          {type === "profile" && <ProfilePage />}
        </div>
        <div className="absolute z-[50] h-screen w-screen backdrop-blur-sm"></div>
      </div>
    );
  }
  return <>{content}</>;
}
