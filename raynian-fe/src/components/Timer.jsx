import React from "react";
import { useState, useEffect } from "react";

const Timer = () => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    <div className="flex flex-row relative">
      <p className="text-[128px] leading-tight">
        {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}:
        {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
      </p>
      <div className="flex flex-col justify-center absolute bottom-[60px] right-[-50px]">
        <div
          className="mx-[5px]"
          onClick={() =>
            setCountdown({
              hours: 1,
              minutes: 0,
              seconds: 0,
            })
          }
        >
          start
        </div>
        <div
          className="mx-[5px]"
          onClick={() =>
            setCountdown({
              hours: 0,
              minutes: 60,
              seconds: 0,
            })
          }
        >
          stop
        </div>
      </div>
    </div>
  );
};

export default Timer;
