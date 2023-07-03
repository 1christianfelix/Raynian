import React, { useEffect } from "react";
import { useContext, useState, useRef } from "react";
import { TimerContext } from "../../context/TimerContext";
import {
  IoPlayOutline,
  IoStopOutline,
  IoSettingsOutline,
  IoPlaySkipForwardOutline,
} from "react-icons/io5";
import { PiPauseLight } from "react-icons/pi";
import TimerSettings from "./TimerSettings";
import "../../index.css";
import { motion } from "framer-motion";

export default function Timer() {
  const [openSettings, setOpenSettings] = useState(false);
  const [playHovered, setPlayHovered] = useState(false);
  const [pauseHovered, setPauseHovered] = useState(false);
  const [stopHovered, setStopHovered] = useState(false);
  const [skipHovered, setSkipHovered] = useState(false);
  const [settingsHovered, setSettingsHovered] = useState(false);
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
      <p className="text-3xl select-none">{message}</p>
      <div className="font-inter flex flex-row justify-center relative select-none">
        <p className="text-[128px] leading-tight">
          {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}
          :
          {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
        </p>
        <div className="flex flex-col justify-center absolute bottom-[35px] right-[-15px]">
          {!isRunning && (
            <div
              className="mx-[5px] my-[5px] absolute bottom-[58px] flex flex-row"
              onClick={startTimer}
            >
              <IoPlayOutline
                size={22}
                className="timer-button text-green-700 cursor-pointer"
                onMouseEnter={() => setPlayHovered(true)}
                onMouseLeave={() => setPlayHovered(false)}
              />
              {playHovered && (
                <motion.div
                  className="tooltip absolute left-[30px] top-[-1px]"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.05 }}
                  style={{ pointerEvents: "none" }}
                >
                  <motion.p
                    className="whitespace-nowrap text-white text-xs align"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Start Timer
                  </motion.p>
                </motion.div>
              )}
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
                onMouseEnter={() => setPauseHovered(true)}
                onMouseLeave={() => setPauseHovered(false)}
              />
              {pauseHovered && (
                <motion.div
                  className="tooltip absolute left-[30px] top-[-3px]"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.05 }}
                  style={{ pointerEvents: "none" }}
                >
                  <motion.p
                    className="whitespace-nowrap text-white text-xs align"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Pause Timer
                  </motion.p>
                </motion.div>
              )}
            </div>
          )}
          {isWork && (
            <div className="mx-[5px] my-[5px]" onClick={stopTimer}>
              <IoStopOutline
                size={20}
                className="timer-button text-red-700 cursor-pointer"
                onMouseEnter={() => setStopHovered(true)}
                onMouseLeave={() => setStopHovered(false)}
              />
              {stopHovered && (
                <motion.div
                  className="tooltip absolute left-[35px] top-[2px]"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.05 }}
                  style={{ pointerEvents: "none" }}
                >
                  <motion.p
                    className="whitespace-nowrap text-white text-xs align"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Stop Timer
                  </motion.p>
                </motion.div>
              )}
            </div>
          )}
          {isBreak && (
            <div className="mx-[5px] my-[5px]" onClick={stopTimer}>
              <IoPlaySkipForwardOutline
                size={20}
                className="timer-button text-slate-700 cursor-pointer dark:text-white"
                onMouseEnter={() => setSkipHovered(true)}
                onMouseLeave={() => setSkipHovered(false)}
              />
              {skipHovered && (
                <motion.div
                  className="tooltip absolute left-[35px] top-[2px]"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.05 }}
                  style={{ pointerEvents: "none" }}
                >
                  <motion.p
                    className="whitespace-nowrap text-white text-xs align"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Skip Break
                  </motion.p>
                </motion.div>
              )}
            </div>
          )}
          <div
            className="mx-[5px] my-[5px] relative"
            onClick={toggleSettings}
            ref={settingsRef}
          >
            <IoSettingsOutline
              size={20}
              className="timer-button text-slate-700 cursor-pointer dark:text-white"
              onMouseEnter={() => setSettingsHovered(true)}
              onMouseLeave={() => setSettingsHovered(false)}
            />
            {settingsHovered && (
              <motion.div
                className="tooltip absolute left-[30px] top-[-2px]"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.05 }}
                style={{ pointerEvents: "none" }}
              >
                <motion.p
                  className="whitespace-nowrap text-white text-xs align"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Settings
                </motion.p>
              </motion.div>
            )}
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

      <p className="text-3xl select-none">
        Sessions completed today:<span className="text-3xl"> 2</span>
      </p>
    </>
  );
}
