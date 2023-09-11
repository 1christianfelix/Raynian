import React, { createContext, useEffect, useState, useContext } from "react";
import { ModalContext } from "./ModalContext";
import { RoomContext } from "./RoomContext";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
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

  const startTimer = () => {
    if (!isRunning) {
      setCountdown((prevCountdown) => ({
        ...prevCountdown,
      }));
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    console.log(workTime, breakTime, isRunning, isWork, isBreak);
    if (isWork)
      setCountdown({
        hours: 0,
        minutes: workTime,
        seconds: 0,
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
