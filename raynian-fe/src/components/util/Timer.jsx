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
import { motion, AnimatePresence } from "framer-motion";

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
    setIsBreak,
    isWork,
    setIsWork,
    isRunning,
  } = useContext(TimerContext);

  const [message, setMessage] = useState("PlaceHolder Message");

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

  useEffect(() => {
    if (isBreak) {
      setMessage("Break Time!");
    } else if (isWork) {
      setMessage("Study Time!");
    } else {
      setMessage("PlaceHolder Message");
    }
  }, [isBreak, isWork, isRunning]);

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  };

  useEffect(() => {
    console.log("playHovered: ", playHovered);
    console.log("pauseHovered: ", pauseHovered);
    console.log("stopHovered: ", stopHovered);
  }, [playHovered, pauseHovered, stopHovered, skipHovered, settingsHovered]);

  return (
    <>
      <p className="select-none text-3xl">{message}</p>
      <div className="relative flex select-none flex-row justify-center">
        <p className="text-[128px] leading-tight">
          {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}
          :
          {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
        </p>
        <div className="absolute bottom-[35px] right-[-15px] flex flex-col justify-center">
          {!isRunning && (
            <div
              className="absolute bottom-[58px] m-[5px] flex flex-row"
              onClick={() => {
                startTimer();
                setPlayHovered(false);
              }}
            >
              <IoPlayOutline
                size={22}
                className="timer-button cursor-pointer text-green-700"
                onMouseEnter={() => setPlayHovered(true)}
                onMouseLeave={() => setPlayHovered(false)}
              />
              <AnimatePresence>
                {playHovered && (
                  <motion.div
                    className="tooltip absolute left-[30px] top-[-4px]"
                    {...tooltipAnimation}
                  >
                    <motion.p
                      className="align whitespace-nowrap text-xs text-white"
                      {...tooltipTextAnimation}
                    >
                      Start Timer
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {isRunning && (
            <div
              className="absolute bottom-[58px] m-[5px]"
              onClick={() => {
                pauseTimer();
                setPauseHovered(false);
              }}
            >
              <PiPauseLight
                size={20}
                className="timer-button cursor-pointer text-slate-700 dark:text-white"
                onMouseEnter={() => setPauseHovered(true)}
                onMouseLeave={() => setPauseHovered(false)}
              />
              <AnimatePresence>
                {pauseHovered && (
                  <motion.div
                    className="tooltip absolute left-[30px] top-[-6px]"
                    {...tooltipAnimation}
                  >
                    <motion.p
                      className="align whitespace-nowrap text-xs text-white"
                      {...tooltipTextAnimation}
                    >
                      Pause Timer
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {isWork && (
            <div className="m-[5px]" onClick={stopTimer}>
              <IoStopOutline
                size={20}
                className="timer-button cursor-pointer text-red-700"
                onMouseEnter={() => setStopHovered(true)}
                onMouseLeave={() => {
                  setStopHovered(false);
                }}
              />
              <AnimatePresence>
                {stopHovered && (
                  <motion.div
                    className="tooltip absolute left-[35px] top-[0px]"
                    {...tooltipAnimation}
                  >
                    <motion.p
                      className="align whitespace-nowrap text-xs text-white"
                      {...tooltipTextAnimation}
                    >
                      Stop Timer
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {isBreak && (
            <div className="m-[5px]" onClick={stopTimer}>
              <IoPlaySkipForwardOutline
                size={20}
                className="timer-button cursor-pointer text-slate-700 dark:text-white"
                onMouseEnter={() => setSkipHovered(true)}
                onMouseLeave={() => setSkipHovered(false)}
                onClick={() => {
                  setIsBreak(false);
                  setIsWork(true);
                  stopTimer();
                }}
              />
              <AnimatePresence>
                {skipHovered && (
                  <motion.div
                    className="tooltip absolute left-[35px] top-[0px]"
                    {...tooltipAnimation}
                  >
                    <motion.p
                      className="align whitespace-nowrap text-xs text-white"
                      {...tooltipTextAnimation}
                    >
                      Skip Break
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <div
            className="relative m-[5px]"
            onClick={() => {
              toggleSettings();
              setSettingsHovered(false);
            }}
            ref={settingsRef}
          >
            <IoSettingsOutline
              size={20}
              className="timer-button cursor-pointer text-slate-700 dark:text-white"
              onMouseEnter={() => setSettingsHovered(true)}
              onMouseLeave={() => setSettingsHovered(false)}
            />
            <AnimatePresence>
              {settingsHovered && (
                <motion.div
                  className="tooltip absolute left-[30px] top-[-6px]"
                  {...tooltipAnimation}
                >
                  <motion.p
                    className="align whitespace-nowrap text-xs text-white"
                    {...tooltipTextAnimation}
                  >
                    Settings
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
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

      <p className="select-none text-3xl">
        Sessions completed today:<span className="text-3xl"> 2</span>
      </p>
    </>
  );
}
