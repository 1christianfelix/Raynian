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
    isWork,
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
              onClick={() => {
                startTimer();
                setPlayHovered(false);
              }}
            >
              <IoPlayOutline
                size={22}
                className="timer-button text-green-700 cursor-pointer"
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
                      className="whitespace-nowrap text-white text-xs align"
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
              className="mx-[5px] my-[5px] absolute bottom-[58px]"
              onClick={() => {
                pauseTimer();
                setPauseHovered(false);
              }}
            >
              <PiPauseLight
                size={20}
                className="timer-button text-slate-700 cursor-pointer dark:text-white"
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
                      className="whitespace-nowrap text-white text-xs align"
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
            <div className="mx-[5px] my-[5px]" onClick={stopTimer}>
              <IoStopOutline
                size={20}
                className="timer-button text-red-700 cursor-pointer"
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
                      className="whitespace-nowrap text-white text-xs align"
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
            <div className="mx-[5px] my-[5px]" onClick={stopTimer}>
              <IoPlaySkipForwardOutline
                size={20}
                className="timer-button text-slate-700 cursor-pointer dark:text-white"
                onMouseEnter={() => setSkipHovered(true)}
                onMouseLeave={() => setSkipHovered(false)}
              />
              <AnimatePresence>
                {skipHovered && (
                  <motion.div
                    className="tooltip absolute left-[35px] top-[0px]"
                    {...tooltipAnimation}
                  >
                    <motion.p
                      className="whitespace-nowrap text-white text-xs align"
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
            className="mx-[5px] my-[5px] relative"
            onClick={() => {
              toggleSettings();
              setSettingsHovered(false);
            }}
            ref={settingsRef}
          >
            <IoSettingsOutline
              size={20}
              className="timer-button text-slate-700 cursor-pointer dark:text-white"
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
                    className="whitespace-nowrap text-white text-xs align"
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

      <p className="text-3xl select-none">
        Sessions completed today:<span className="text-3xl"> 2</span>
      </p>
    </>
  );
}
