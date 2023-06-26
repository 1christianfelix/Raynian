import React, { createContext, useEffect, useState } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (!isRunning) {
      setCountdown((prevCountdown) => ({
        ...prevCountdown,
        minutes: prevCountdown.minutes ? prevCountdown.minutes : 60,
      }));
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setCountdown({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    setIsRunning(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    let timerID = null;
    if (isRunning) {
      timerID = setInterval(() => {
        if (
          countdown.hours === 0 &&
          countdown.minutes === 0 &&
          countdown.seconds === 0
        )
          clearInterval(timerID);
        else if (countdown.minutes === 0 && countdown.seconds === 0)
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
  }, [countdown, isRunning]);

  return (
    <TimerContext.Provider
      value={{ countdown, startTimer, stopTimer, pauseTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};
