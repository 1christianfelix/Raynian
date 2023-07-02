import React from "react";
import { useContext, useState, useRef } from "react";
import { TimerContext } from "../../context/TimerContext";
import {
  IoPlayOutline,
  IoStopOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { PiPauseLight } from "react-icons/pi";
import TimerSettings from "./TimerSettings";

export default function Timer() {
  const [openSettings, setOpenSettings] = useState(false);
  const settingsRef = useRef();
  const { countdown, startTimer, stopTimer, pauseTimer } =
    useContext(TimerContext);

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <div className="font-inter flex flex-row justify-center relative">
      <p className="text-[128px] leading-tight">
        {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}:
        {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
      </p>
      <div className="flex flex-col justify-center absolute bottom-[20px] right-[-30px]">
        <div className="mx-[5px] my-[5px]" onClick={startTimer}>
          <IoPlayOutline
            size={22}
            className="timer-button text-green-700 cursor-pointer"
          />
        </div>
        <div className="mx-[5px] my-[5px]" onClick={stopTimer}>
          <IoStopOutline
            size={20}
            className="timer-button text-red-700 cursor-pointer"
          />
        </div>
        <div className="mx-[5px] my-[5px]" onClick={pauseTimer}>
          <PiPauseLight
            size={20}
            className="timer-button text-slate-700 cursor-pointer dark:text-white"
          />
        </div>
        <div
          className="mx-[5px] my-[5px]"
          onClick={toggleSettings}
          ref={settingsRef}
        >
          <IoSettingsOutline
            size={20}
            className="timer-button text-slate-700 cursor-pointer dark:text-white"
          />
        </div>
        {openSettings && (
          <TimerSettings
            setOpenSettings={setOpenSettings}
            openSettings={openSettings}
            settingsRef={settingsRef}
          />
        )}
      </div>
    </div>
  );
}
