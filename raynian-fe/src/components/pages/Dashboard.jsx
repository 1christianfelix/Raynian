import React, { useContext, useEffect, useRef, useState } from "react";
import { generateUniqueUserNoCheck } from "../../helpers/generateUser";
import { useDispatch, useSelector } from "react-redux";
import { generateGuestCredentials } from "../../slices/authSlice";
import { setRoomUser } from "../../slices/roomSlice";
import { usePalette } from "react-palette";
import { TimerProvider } from "../../context/TimerContext";
import { WallpaperContext } from "../../context/WallpaperContex";
import { PanelContext } from "../../context/PanelContext";
import { BGCustomContext } from "../../context/BGCustomContext";

import Timer from "../util/Timer";

import Chat from "../chat/ChatDisplay";
import RoomButton from "../rooms/RoomButton";
import ParticipantList from "../participants/ParticipantList";
import Timer2 from "../timer/Timer2";
import SessionStatsDisplay from "../stats/SessionStatsDisplay";
import Nav from "../navigation/Nav";
import TempTaskSystem from "./TempTaskSystem";

const Dashboard = () => {
  const {
    chatPanel,
    setChatPanel,
    timerPanel,
    setTimerPanel,
    sessionStatsPanel,
    setSessionStatsPanel,
    participantsPanel,
    setParticipantsPanel,
  } = useContext(PanelContext);
  const { bg } = useContext(BGCustomContext);
  const { wallpaper, selectedGradient, theme } = useContext(WallpaperContext);

  // const [selectedImage, setSelectedImage] = useState(
  //   "/images/backgrounds/lofi1-pikisuperstar.jpg"
  // );
  // const { data, loading, error } = usePalette(selectedImage);
  // useEffect(() => {}, [data]);

  const { userInfo } = useSelector((state) => state.auth);
  const { roomId } = useSelector((state) => state.room);

  const dispatch = useDispatch();

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  // handle guest info
  useEffect(() => {
    if (userInfo === null) {
      dispatch(generateGuestCredentials());
    }
    dispatch(setRoomUser());
  }, [userInfo]);

  return (
    <div
      className="relative flex h-screen w-screen flex-col"
      style={{ background: selectedGradient ? bg : "" }}
    >
      {wallpaper}

      <Nav />
      <div className=" mx-16 mb-12 h-[100%] flex flex-grow overflow-hidden">
        <div className="inline-flex h-[100%] min-w-content flex-col justify-between  first:mt-4">
          <div className="h-3/5 flex flex-col gap-4">
            <div
              className={`shadow-panel mx-4 flex flex-col justify-center p-4 backdrop-blur-sm transition-all duration-[700ms] ${
                !timerPanel ? "hidden" : ""
              }`}
              style={{
                backgroundColor: theme[0] || "#fafafaB4",
                boxShadow: `8px 8px 1px ${theme[1] || "#8080807F"}`,
              }}
            >
              <Timer2 />
            </div>
            <div
              className={`shadow-panel mx-4 flex justify-center p-4 backdrop-blur-sm transition-all duration-[700ms] ${
                !sessionStatsPanel ? "hidden" : ""
              }`}
              style={{
                backgroundColor: theme[0] || "#fafafaB4",
                boxShadow: `8px 8px 1px ${theme[1] || "#8080807F"}`,
              }}
            >
              <SessionStatsDisplay />
            </div>
            {participantsPanel && roomId && (
              <div
                className={`shadow-panel mx-4 flex justify-center p-4 backdrop-blur-sm transition-all duration-[700ms] max-h-full overflow-hidden overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-black ${
                  !participantsPanel ? "hidden" : ""
                }`}
                style={{
                  backgroundColor: theme[0] || "#fafafaB4",
                  boxShadow: `8px 8px 1px ${theme[1] || "#8080807F"}`,
                }}
              >
                <ParticipantList />
              </div>
            )}
          </div>
          <div
            className={`h-2/5 overflow-auto p-4 ${
              !chatPanel ? "invisible" : ""
            }`}
          >
            {chatPanel && roomId && <Chat />}
          </div>
        </div>
        <div className="justify-end p-4">
          <div
            className=" min-w-content"
            style={{
              backgroundColor: theme[0] || "#fafafaB4",
              boxShadow: `8px 8px 1px ${theme[1] || "#8080807F"}`,
            }}
          >
            <TempTaskSystem></TempTaskSystem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
