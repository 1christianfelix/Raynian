import React, { useEffect } from "react";
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
  const {
    countdown,
    startTimer,
    stopTimer,
    pauseTimer,
    isBreak,
    isWork,
    isRunning,
  } = useContext(TimerContext);

  const [message, setMessage] = useState("PlaceHolder Message");

  useEffect(() => {
    if (isBreak) {
      console.log("BREAK");
      setMessage("Break Time!");
    } else if (isWork) {
      console.log("Study");
      setMessage("Study Time!");
    } else {
      setMessage("PlaceHolder Message");
    }
  }, [isBreak, isWork, isRunning]);

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <>
      <p className="text-3xl">{message}</p>
      <div className="font-inter flex flex-row justify-center relative">
        <p className="text-[128px] leading-tight">
          {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}
          :
          {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
        </p>
        <div className="flex flex-col justify-center absolute bottom-[35px] right-[-30px]">
          {!isRunning && (
            <div
              className="mx-[5px] my-[5px] absolute bottom-[58px]"
              onClick={startTimer}
            >
              <IoPlayOutline
                size={22}
                className="timer-button text-green-700 cursor-pointer"
              />
            </div>
          )}
          {isRunning && (
            <div
              className="mx-[5px] my-[5px] absolute bottom-[58px]"
              onClick={pauseTimer}
            >
              <PiPauseLight
                size={20}
                className="timer-button text-slate-700 cursor-pointer dark:text-white"
              />
            </div>
          )}
          <div className="mx-[5px] my-[5px]" onClick={stopTimer}>
            <IoStopOutline
              size={20}
              className="timer-button text-red-700 cursor-pointer"
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
    </>
  );
}
