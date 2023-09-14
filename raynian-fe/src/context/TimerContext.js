import React, { createContext, useEffect, useState, useContext } from "react";
import { ModalContext } from "./ModalContext";
import { RoomContext } from "./RoomContext";
import { useDispatch, useSelector } from "react-redux";
import { updateTimer } from "../slices/timerSlice";
export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { toggleAFK } = useContext(ModalContext);
  const { playSound } = useContext(RoomContext);

  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 60,
    seconds: 0,
  });
  const [workTime, setWorkTime] = useState(60);
  const [breakTime, setBreakTime] = useState(15);
  const [isBreak, setIsBreak] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startTimer = () => {
    setIsPaused(false);
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    console.log(workTime, breakTime, isRunning, isWork, isBreak);
    if (isWork)
      setCountdown({
        hours: 0,
        minutes: 0,
        seconds: 1,
      });
    if (isBreak)
      setCountdown({
        hours: 0,
        minutes: breakTime,
        seconds: 0,
      });
    setIsRunning(false);
    console.log(workTime, breakTime, isRunning, isWork, isBreak);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  useEffect(() => {
    if (!isRunning)
      setCountdown({
        hours: 0,
        minutes: workTime,
        seconds: 0,
      });
  }, [workTime]);

  useEffect(() => {
    if (!isRunning)
      setCountdown({
        hours: 0,
        minutes: breakTime,
        seconds: 0,
      });
  }, [breakTime]);

  // update user's Redux state
  // useEffect(() => {
  //   dispatch(
  //     updateTimer({
  //       countdown,
  //       workTime,
  //       breakTime,
  //       isBreak,
  //       isWork,
  //       isRunning,
  //       isPaused,
  //     })
  //   );
  // }, [isRunning, isWork, isBreak, workTime, breakTime]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          const { hours, minutes, seconds } = prevCountdown;

          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);
            playSound();

            if (isWork) {
              setIsBreak(true);
              setIsWork(false);
              return {
                hours: 0,
                minutes: breakTime,
                seconds: 0,
              };
            } else {
              toggleAFK();
              stopTimer();
              setIsWork(true);
              setIsBreak(false);
              return {
                hours: 0,
                minutes: workTime,
                seconds: 0,
              };
            }
          }

          if (minutes === 0 && seconds === 0) {
            return {
              hours: hours - 1,
              minutes: 59,
              seconds: 59,
            };
          } else if (seconds === 0) {
            return {
              hours,
              minutes: minutes - 1,
              seconds: 59,
            };
          } else {
            return {
              hours,
              minutes,
              seconds: seconds - 1,
            };
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, isWork, isBreak, toggleAFK, playSound]);

  return (
    <TimerContext.Provider
      value={{
        countdown,
        startTimer,
        stopTimer,
        pauseTimer,
        setCountdown,
        workTime,
        setWorkTime,
        breakTime,
        setBreakTime,
        isBreak,
        setIsBreak,
        isWork,
        setIsWork,
        isRunning,
        setIsRunning,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
