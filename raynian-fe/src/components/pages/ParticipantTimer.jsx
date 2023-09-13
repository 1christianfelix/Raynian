import React, { useEffect, useState } from "react";
import { RiPauseCircleLine, RiCircleFill, RiSquareFill } from "react-icons/ri";

const ParticipantTimer = ({
  timer,
  isRunning,
  isWork,
  isBreak,
  isPaused,
  workTime,
  breakTime,
}) => {
  const [countdown, setCountdown] = useState(timer);
  useEffect(() => {
    setCountdown(timer);
  }, [timer, workTime, breakTime]);

  useEffect(() => {
    console.log("timer:", timer);
    let interval;
    if (!isRunning && !isPaused) {
      if (isWork) {
        setCountdown({
          hours: 0,
          minutes: workTime,
          seconds: 0,
        });
      } else if (isBreak) {
        setCountdown({
          hours: 0,
          minutes: breakTime,
          seconds: 0,
        });
      }
    }
    if (isRunning) {
      interval = setInterval(() => {
        console.log("start interval", isWork);
        setCountdown((prevCountdown) => {
          const { hours, minutes, seconds } = prevCountdown;

          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);
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
      console.log("clear");
      clearInterval(interval);
    };
  }, [isRunning, isPaused, workTime, breakTime]);

  useEffect(() => {
    if (isWork) {
      // setIsBreak(true);
      // setIsWork(false);
      console.log("set to work");
      setCountdown({
        hours: 0,
        minutes: workTime,
        seconds: 0,
      });
    } else {
      // setIsWork(true);
      // setIsBreak(false);
      console.log("set to break");
      setCountdown({
        hours: 0,
        minutes: breakTime,
        seconds: 0,
      });
    }
  }, [isBreak, isWork]);

  const renderIcon = () => {
    if (isPaused) {
      return <RiPauseCircleLine color="black" />;
    } else if (!isRunning && !isPaused) {
      return <RiSquareFill color="red" />;
    } else if (isWork) {
      return <RiCircleFill color="green" />;
    } else if (isBreak) {
      return <RiCircleFill color="blue" />;
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {renderIcon()}
      {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}:
      {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
    </div>
  );
};

export default ParticipantTimer;
