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
import { Tooltip } from "react-tooltip";
import TimerTooltip from "./TimerTooltip";

const TimerContols = () => {
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);
  const { roomId } = useSelector((state) => state.room);

  const [playHovered, setPlayHovered] = useState(false);
  const [pauseHovered, setPauseHovered] = useState(false);
  const [stopHovered, setStopHovered] = useState(false);
  const [skipHovered, setSkipHovered] = useState(false);
  const skipRef = useRef(null);
  const stopRef = useRef(null);
  const pauseRef = useRef(null);
  const startRef = useRef(null);

  const tooltipAnimation = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { opacity: 0, width: 0, transition: { duration: 0.05 } },
    transition: { duration: 0.05 },
    style: { pointerEvents: "none" },
  };

  const tooltipTextAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

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
    <div className="flex flex-col items-start gap-2">
      {/* <button onClick={handleStartTimer}>StartTimer</button>
      <button onClick={handleStopTimer}>StopTimer</button>
      <button onClick={handlePauseTimer}>PauseTimer</button> */}
      {!timerState.isRunning && (
        <div
          className="group relative flex items-center justify-center gap-2"
          onClick={handleStartTimer}
          ref={startRef}
        >
          <IoPlayOutline
            size={20}
            className="timer-button cursor-pointer text-green-700"
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
          className="group relative flex items-center justify-center gap-2"
          onClick={handlePauseTimer}
          ref={pauseRef}
        >
          <PiPauseLight
            size={20}
            className="timer-button cursor-pointer text-blue-600 dark:text-white"
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
            className="timer-button cursor-pointer text-red-700"
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
            className="timer-button cursor-pointer text-yellow-500"
            onMouseEnter={() => {
              setSkipHovered(true);
            }}
            onMouseLeave={() => {
              setSkipHovered(false);
            }}
          />
          <TimerTooltip type={"skip"} container={skipRef} text={"Skip Break"} />
        </div>
      )}

      {/* <Tooltip
        id="start"
        noArrow
        style={{
          backgroundColor: "#2cb150",
          padding: "4px",
          fontSize: "16px",
        }}
        delayShow={100}
        delayHide={100}
        middlewares={[]}
      />
      <Tooltip
        id="stop"
        noArrow
        style={{
          backgroundColor: "#c03333",
          padding: "4px",
          fontSize: "16px",
        }}
        delayShow={100}
        delayHide={100}
      />
      <Tooltip
        id="skip"
        noArrow
        style={{
          backgroundColor: "#ecbb21",
          padding: "4px",
          fontSize: "16px",
        }}
        delayShow={100}
        delayHide={100}
      />
      <Tooltip
        id="pause"
        noArrow
        style={{
          backgroundColor: "#3b73ed",
          padding: "4px",
          fontSize: "16px",
        }}
        delayShow={100}
        delayHide={100}
      /> */}
    </div>
  );
};

export default TimerContols;
