import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as timerActions from "../../slices/timerSlice";

const TestTimer = () => {
  // const [workTime, setWorkTime] = useState(60);
  // const [breakTime, setBreakTime] = useState(15);
  const [currentCountdown, setCurrentCountdown] = useState({
    hours: 0,
    minutes: 11,
    seconds: 0,
  });

  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);

  const handleWorkTimeChange = (e) => {
    dispatch(timerActions.setWorkTime(parseInt(e.target.value)));
  };

  const handleBreakTimeChange = (e) => {
    dispatch(timerActions.setBreakTime(parseInt(e.target.value)));
  };

  useEffect(() => {
    if (!timerState.isRunning && !timerState.isPaused) {
      if (timerState.isWork) {
        setCurrentCountdown({
          hours: 0,
          minutes: timerState.workTime,
          seconds: 0,
        });
      } else if (timerState.isBreak) {
        setCurrentCountdown({
          hours: 0,
          minutes: timerState.breakTime,
          seconds: 0,
        });
      }
    }
  }, [
    timerState.isRunning,
    timerState.isWork,
    timerState.workTime,
    timerState.isBreak,
    timerState.breakTime,
  ]);

  useEffect(() => {
    let interval;

    if (timerState.isRunning) {
      interval = setInterval(() => {
        setCurrentCountdown((prevCountdown) => {
          const { hours, minutes, seconds } = prevCountdown;

          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);

            if (timerState.isWork) {
              setIsBreak(true);
              setIsWork(false);
              return {
                hours: 0,
                minutes: breakTime,
                seconds: 0,
              };
            } else {
              handleStopTimer();
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
  }, [timerState.isRunning, timerState.isWork, timerState.isBreak]);

  const handleStartTimer = () => {
    dispatch(timerActions.startTimer());
  };

  const handleStopTimer = () => {
    dispatch(timerActions.stopTimer());
  };

  const handlePauseTimer = () => {
    dispatch(timerActions.pauseTimer(currentCountdown));
  };

  const subtract = () => {
    setCurrentCountdown((prevCountdown) => {
      const { hours, minutes, seconds } = prevCountdown;

      return {
        hours,
        minutes: minutes - 1,
        seconds,
      };
    });
  };

  return (
    <div>
      <p className="text-[128px] leading-tight">
        {currentCountdown.minutes < 10
          ? `0${currentCountdown.minutes}`
          : currentCountdown.minutes}
        :
        {currentCountdown.seconds < 10
          ? `0${currentCountdown.seconds}`
          : currentCountdown.seconds}
      </p>
      <div className="flex flex-col items-start">
        <div>
          <label htmlFor="workTime">Work Time:</label>
          <select
            id="workTime"
            value={timerState.workTime}
            onChange={handleWorkTimeChange}
          >
            <option value={60}>60 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={30}>30 minutes</option>
          </select>

          <label htmlFor="breakTime">Break Time:</label>
          <select
            id="breakTime"
            value={timerState.breakTime}
            onChange={handleBreakTimeChange}
          >
            <option value={15}>15 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={5}>5 minutes</option>
          </select>
        </div>
        <button onClick={handleStartTimer}>StartTimer</button>
        <button onClick={handleStopTimer}>StopTimer</button>
        <button onClick={handlePauseTimer}>PauseTimer</button>
        <button onClick={subtract}>subtracttest</button>
      </div>
    </div>
  );
};

export default TestTimer;
