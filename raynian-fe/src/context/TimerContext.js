import React, { createContext, useEffect, useState } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
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

  const switchToBreak = () => {
    setIsWork(!isWork);
    setIsBreak(!isBreak);
  };

  useEffect(() => {
    if (isBreak) {
      console.log("in break t");
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
          minutes: 5,
          seconds: 0,
        });
    }
  }, [isBreak, breakTime]);

  useEffect(() => {
    let timerID = null;
    if (isWork && isRunning) {
      timerID = setInterval(() => {
        if (
          countdown.hours === 0 &&
          countdown.minutes === 0 &&
          countdown.seconds === 0
        ) {
          clearInterval(timerID);
          switchToBreak();
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
      console.log("in here");
      timerID = setInterval(() => {
        if (
          countdown.hours === 0 &&
          countdown.minutes === 0 &&
          countdown.seconds === 0
        ) {
          console.log("inheree");
          clearInterval(timerID);
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
        isWork,
        isRunning,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
