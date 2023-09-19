import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as timerActions from "../../slices/timerSlice";
import {
  updateTimerStatus,
  sendCurrentTimerStatus,
} from "../socket/socketConnection";
import {
  IoPlayOutline,
  IoStopOutline,
  IoSettingsOutline,
  IoPlaySkipForwardOutline,
} from "react-icons/io5";
import { PiPauseLight } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import TimerTooltip from "./TimerTooltip";

const TimerContols = () => {
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);
  const { roomId } = useSelector((state) => state.room);
  const skipRef = useRef(null);
  const stopRef = useRef(null);
  const pauseRef = useRef(null);
  const startRef = useRef(null);

  const handleStartTimer = () => {
    dispatch(timerActions.startTimer());
    // getTimerState();
  };

  const handleStopTimer = () => {
    dispatch(timerActions.stopTimer());
    // getTimerState();
  };

  const handlePauseTimer = () => {
    dispatch(timerActions.pauseTimer());
    // getTimerState();
  };

  return (
    <div className="flex flex-col items-start gap-2 m-2">
      {!timerState.isRunning && (
        <div
          className="group relative flex items-center justify-center gap-2"
          onClick={handleStartTimer}
          ref={startRef}
        >
          <IoPlayOutline
            size={20}
            className="timer-button cursor-pointer select-none text-green-700"
          />
          <TimerTooltip
            type={"start"}
            container={startRef}
            text={"Start Timer"}
          />
        </div>
      )}

      {timerState.isRunning && (
        <div
          className="group relative flex items-center justify-center gap-2 "
          onClick={handlePauseTimer}
          ref={pauseRef}
        >
          <PiPauseLight
            size={20}
            className="timer-button cursor-pointer select-none text-blue-600 dark:text-white"
          />
          <TimerTooltip
            type={"pause"}
            container={pauseRef}
            text={"Pause Timer"}
          />
        </div>
      )}
      {timerState.isWork && (
        <div
          className="group relative flex items-center justify-center gap-2"
          onClick={handleStopTimer}
          ref={stopRef}
        >
          <IoStopOutline
            size={20}
            className="timer-button cursor-pointer select-none text-red-700"
          />
          <TimerTooltip type={"stop"} container={stopRef} text={"Stop Timer"} />
        </div>
      )}
      {timerState.isBreak && (
        <div
          className="group relative flex items-center justify-center gap-2"
          onClick={handleStopTimer}
          ref={skipRef}
        >
          <IoPlaySkipForwardOutline
            size={20}
            className="timer-button cursor-pointer select-none text-yellow-500"
          />
          <TimerTooltip type={"skip"} container={skipRef} text={"Skip Break"} />
        </div>
      )}
      <div
        className={`group relative flex items-center justify-center gap-2 transition-all duration-200 ${
          timerState.isRunning || timerState.isPaused
            ? "text-gray-300"
            : "cursor-pointer text-gray-500"
        }`}
        onClick={timerState.isRunning ? null : handleStopTimer} // Make it non-clickable when timer is running
        ref={skipRef}
      >
        <IoSettingsOutline size={20} className="timer-button select-none" />
        {timerState.isRunning || timerState.isPaused ? (
          <TimerTooltip
            type={"settings"}
            container={skipRef}
            text={"Settings unavailable while session is running"}
          />
        ) : (
          <TimerTooltip
            type={"settings"}
            container={skipRef}
            text={"Timer Settings"}
          />
        )}
      </div>
    </div>
  );
};

export default TimerContols;
