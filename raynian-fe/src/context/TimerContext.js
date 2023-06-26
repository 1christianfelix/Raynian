import React, { createContext, useEffect, useState } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const startTimer = () => {
    setCountdown({
      hours: 0,
      minutes: 60,
      seconds: 0,
    });
  };

  const stopTimer = () => {
    setCountdown({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  useEffect(() => {
    let timerID = setInterval(() => {
      if (
        countdown.hours === 0 &&
        countdown.minutes === 0 &&
        countdown.seconds === 0
      )
        clearInterval(timerID);
      else if (countdown.minutes === 0 && countdown.seconds === 0)
        setCountdown({ hours: countdown.hours - 1, minutes: 59, seconds: 59 });
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
    return () => clearInterval(timerID);
  }, [countdown]);

  return (
    <TimerContext.Provider value={{ countdown, startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
