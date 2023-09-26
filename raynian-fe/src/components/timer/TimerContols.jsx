import React, { useState, useRef, useContext } from "react";
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
import { ModalContext } from "../../context/ModalContext";
import TimerSettings from "../timer/TimerSettings";

const TimerContols = () => {
  // const { toggleTimerSettings } = useContext(ModalContext);
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);
  const { roomId } = useSelector((state) => state.room);
  const skipRef = useRef(null);
  const stopRef = useRef(null);
  const pauseRef = useRef(null);
  const startRef = useRef(null);

  const [toggleTimerSettings, setToggleTimerSettings] = useState(false);

  const closeAllMenus = () => {
    setToggleTimerSettings(false);
  };

  const handleToggleTimerSettings = () => {
    setToggleTimerSettings((prev) => !prev);
  };

  const handleStartTimer = () => {
    closeAllMenus();
    dispatch(timerActions.startTimer());
    // getTimerState();
  };

  const handleStopTimer = () => {
    closeAllMenus();
    dispatch(timerActions.stopTimer());
    // getTimerState();
  };

  const handlePauseTimer = () => {
    dispatch(timerActions.pauseTimer());
    // getTimerState();
  };

  return (
    <div className="m-2 flex flex-col items-start gap-2">
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
        onClick={
          !timerState.isRunning && !timerState.isPaused
            ? handleToggleTimerSettings
            : null
        } // Make it non-clickable when timer is running
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
          !toggleTimerSettings && (
            <TimerTooltip
              type={"settings"}
              container={skipRef}
              text={"Timer Settings"}
            />
          )
        )}
        {toggleTimerSettings && (
          <div
            className="absolute z-10 left-20 -top-4 h-full cursor-default "
            onClick={(e) => e.stopPropagation()}
          >
            <TimerSettings
              handleToggleTimerSettings={handleToggleTimerSettings}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerContols;
