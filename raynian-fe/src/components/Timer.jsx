import React from "react";
import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";
import {
  IoPlayOutline,
  IoStopOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { PiPauseLight } from "react-icons/pi";

export default function Timer() {
  const { countdown, startTimer, stopTimer, pauseTimer } =
    useContext(TimerContext);

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
            className="timer-button text-slate-700 cursor-pointer"
          />
        </div>
        <div className="mx-[5px] my-[5px]" onClick={pauseTimer}>
          <IoSettingsOutline
            size={20}
            className="timer-button text-slate-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
