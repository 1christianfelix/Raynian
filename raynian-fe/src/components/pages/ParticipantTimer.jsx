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
    if (!isRunning) {
      setCountdown(timer);
    }

    // if (!isRunning && countdown.minutes == workTime) {
    //   setCountdown({
    //     hours: 0,
    //     minutes: workTime,
    //     seconds: 0,
    //   });
    // }
  }, [timer, workTime, breakTime]);
  useEffect(() => {
    let interval;
    console.log(isRunning, isPaused, "in here");
    if (!isRunning && !isPaused) {
      if (isWork) {
        console.log("changed");
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
        setCountdown((prevCountdown) => {
          const { hours, minutes, seconds } = prevCountdown;

          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);
            if (isWork) {
              // setIsBreak(true);
              // setIsWork(false);

              return {
                hours: 0,
                minutes: breakTime,
                seconds: 0,
              };
            } else {
              // setIsWork(true);
              // setIsBreak(false);
              return {
                hours: 0,
                minutes: timerState.workTime,
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
  }, [isRunning, isPaused, isWork, isBreak, workTime, breakTime]);

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
