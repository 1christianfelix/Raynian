import React, { useContext, useEffect, useRef, useState } from "react";
import { generateUniqueUserNoCheck } from "../../helpers/generateUser";
import { useDispatch, useSelector } from "react-redux";
import { generateGuestCredentials } from "../../slices/authSlice";
import { setRoomUser } from "../../slices/roomSlice";
import { usePalette } from "react-palette";
import { TimerProvider } from "../../context/TimerContext";
import { WallpaperContext } from "../../context/WallpaperContex";
import { BGCustomContext } from "../../context/BGCustomContext";

import Timer from "../util/Timer";

import Chat from "../chat/ChatDisplay";
import RoomButton from "../rooms/RoomButton";
import ParticipantList from "../rooms/ParticipantList";
import Timer2 from "../timer/Timer2";
import ParticipantListTest from "./ParticipantListTest";
import Nav from "../navigation/Nav";

const Dashboard = () => {
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
      className="flex h-screen w-screen flex-col"
      style={{ background: selectedGradient ? bg : "" }}
    >
      {wallpaper}

      <Nav />
      <div className=" mx-16 mb-12 h-[100%] flex-grow overflow-hidden">
        <div className="inline-flex h-[100%] flex-col justify-between">
          <div
            className="shadow-panel m-4 flex flex-col justify-center p-4 backdrop-blur-sm transition-all duration-[700ms]"
            style={{
              backgroundColor: theme[0] || "#fafafaB4",
              boxShadow: `8px 8px 1px ${theme[1] || "#8080807F"}`,
            }}
          >
            <Timer2 />
            {roomId && <ParticipantList />}
          </div>
          <div className="flex-grow  overflow-auto p-4">
            {roomId && <Chat />}
          </div>

          {/* <div className="col-span-2 border">
            <div className="l grid grid-flow-row grid-cols-4 place-items-center gap-4 p-10">
              <div className="h-56 w-56 bg-green-300"></div>
              <div className="h-56 w-56 bg-red-300"></div>
              <div className="h-56 w-56 bg-pink-300"></div>
              <div className="h-56 w-56 bg-blue-300"></div>
              <div className="h-56 w-56 bg-purple-300"></div>
              <div className="h-56 w-56 bg-green-300"></div>
              <div className="h-56 w-56 bg-yellow-300"></div>
              <div className="h-56 w-56 bg-orange-300"></div>
              <div className="h-56 w-56 bg-emerald-300"></div>
              <div className="h-56 w-56 bg-amber-300"></div>
              <div className="h-56 w-56 bg-indigo-300"></div>
            </div>
          </div> */}
        </div>

        {/* <ParticipantListTest></ParticipantListTest> */}
      </div>
    </div>
  );
};

export default Dashboard;
