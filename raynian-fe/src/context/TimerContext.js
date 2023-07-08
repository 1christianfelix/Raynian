import React, { createContext, useEffect, useState, useContext } from "react";
import { ModalContext } from "./ModalContext";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const { toggleAFK } = useContext(ModalContext);
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 60,
    seconds: 0,
  });
  const [workTime, setWorkTime] = useState("60 min");
  const [breakTime, setBreakTime] = useState("15 min");
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
    if (workTime === "60 min")
      setCountdown({
        hours: 0,
        minutes: 60,
        seconds: 0,
      });
    if (workTime === "45 min")
      setCountdown({
        hours: 0,
        minutes: 45,
        seconds: 0,
      });
    if (workTime === "30 min")
      setCountdown({
        hours: 0,
        minutes: 30,
        seconds: 0,
      });
    setIsRunning(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  //Set break time
  useEffect(() => {
    if (isBreak) {
      if (breakTime === "15 min")
        setCountdown({
          hours: 0,
          minutes: 15,
          seconds: 0,
        });
      if (breakTime === "10 min")
        setCountdown({
          hours: 0,
          minutes: 10,
          seconds: 0,
        });
      if (breakTime === "5 min")
        setCountdown({
          hours: 0,
          minutes: 0,
          seconds: 3,
        });
    }
  }, [isBreak, breakTime]);

  //Set work time
  useEffect(() => {
    if (isWork) {
      if (workTime === "60 min")
        setCountdown({
          hours: 0,
          minutes: 60,
          seconds: 0,
        });
      if (workTime === "45 min")
        setCountdown({
          hours: 0,
          minutes: 45,
          seconds: 0,
        });
      if (workTime === "30 min")
        setCountdown({
          hours: 0,
          minutes: 0,
          seconds: 3,
        });
    }
  }, [isWork, workTime]);

  //Switch from work to break time automatically
  useEffect(() => {
    const switchState = () => {
      setIsWork(!isWork);
      setIsBreak(!isBreak);
    };
    let timerID = null;
    if (isWork && isRunning) {
      timerID = setInterval(() => {
        if (
          countdown.hours === 0 &&
          countdown.minutes === 0 &&
          countdown.seconds === 0
        ) {
          clearInterval(timerID);
          switchState();
        } else if (countdown.minutes === 0 && countdown.seconds === 0)
          setCountdown({
            hours: countdown.hours - 1,
            minutes: 59,
            seconds: 59,
          });
        else if (countdown.seconds === 0)
          setCountdown({
            hours: countdown.hours,
            minutes: countdown.minutes - 1,
            seconds: 59,
          });
        else
          setCountdown({
            hours: countdown.hours,
            minutes: countdown.minutes,
            seconds: countdown.seconds - 1,
          });
      }, 1000);
    }
    if (isBreak && isRunning) {
      timerID = setInterval(() => {
        if (
          countdown.hours === 0 &&
          countdown.minutes === 0 &&
          countdown.seconds === 0
        ) {
          clearInterval(timerID);
          toggleAFK();
          stopTimer();
          switchState();
        } else if (countdown.minutes === 0 && countdown.seconds === 0)
          setCountdown({
            hours: countdown.hours - 1,
            minutes: 59,
            seconds: 59,
          });
        else if (countdown.seconds === 0)
          setCountdown({
            hours: countdown.hours,
            minutes: countdown.minutes - 1,
            seconds: 59,
          });
        else
          setCountdown({
            hours: countdown.hours,
            minutes: countdown.minutes,
            seconds: countdown.seconds - 1,
          });
      }, 1000);
    }
    return () => clearInterval(timerID);
  }, [countdown, isRunning, isBreak, isWork]);

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
