import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as timerActions from "../../slices/timerSlice";
import {
  updateTimerStatus,
  sendCurrentTimerStatus,
} from "../socket/socketConnection";

const TimerDisplay = () => {
  // const [workTime, setWorkTime] = useState(60);
  // const [breakTime, setBreakTime] = useState(15);
  const [currentCountdown, setCurrentCountdown] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });

  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);
  const { roomId } = useSelector((state) => state.room);

  useEffect(() => {
    let interval;

    if (timerState.isRunning) {
      interval = setInterval(() => {
        dispatch(timerActions.decrementCountdown());
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, timerState.isRunning]);

  useEffect(() => {
    if (timerState.syncedWithRoom != true) {
      dispatch(
        timerActions.updateCountdown({
          hours: currentCountdown.hours,
          minutes: currentCountdown.minutes,
          seconds: currentCountdown.seconds,
        })
      );
      getTimerState();
    }
  }, [currentCountdown]);

  // update selected timer
  useEffect(() => {
    if (!timerState.isRunning && !timerState.isPaused) {
      if (timerState.isWork) {
        // setCurrentCountdown({
        //   hours: 0,
        //   minutes: timerState.workTime,
        //   seconds: 0,
        // });
        dispatch(timerActions.updateCountdown(timerState.workTime));
      } else if (timerState.isBreak) {
        // setCurrentCountdown({
        //   hours: 0,
        //   minutes: timerState.breakTime,
        //   seconds: 0,
        // });
        dispatch(timerActions.updateCountdown(timerState.breakTime));
      }
    }
    getTimerState();
  }, [
    timerState.isRunning,
    timerState.isPaused,
    timerState.workTime,
    timerState.breakTime,
  ]);

  // update sockets
  useEffect(() => {
    getTimerState();
  }, [roomId, timerState.isWork, timerState.isBreak, timerState.countdown]);

  // useEffect(() => {
  //   if (currentCountdown.seconds % 20 == 0) {
  //     console.log("updating all!");
  //     getCurrentCountdown();
  //   }
  // }, [currentCountdown]);

  const getTimerState = async () => {
    const timerData = await dispatch(timerActions.getTimerState());
    if (roomId != null) {
      const updatedTimerData = {
        countdown: timerData.countdown,
        isRunning: timerData.isRunning,
        isBreak: timerData.isBreak,
        isWork: timerData.isWork,
        isPaused: timerData.isPaused,
        workTime: timerData.workTime,
        breakTime: timerData.breakTime,
        sessionStreak: timerData.sessionStreak,
      };

      updateTimerStatus(updatedTimerData, roomId);
    }
  };

  const getCurrentCountdown = async () => {
    const timerData = await dispatch(timerActions.getTimerState());
    if (roomId != null) {
      const updatedTimerData = {
        countdown: currentCountdown,
        isRunning: timerData.isRunning,
        isBreak: timerData.isBreak,
        isWork: timerData.isWork,
        isPaused: timerData.isPaused,
        workTime: timerData.workTime,
        breakTime: timerData.breakTime,
        sessionStreak: timerData.sessionStreak,
      };
      console.log("123", currentCountdown, updatedTimerData);

      updateTimerStatus(updatedTimerData, roomId);
    }
  };

  const handleWorkTimeChange = (e) => {
    dispatch(timerActions.setWorkTime(parseInt(e.target.value)));
    getTimerState();
  };

  const handleBreakTimeChange = (e) => {
    dispatch(timerActions.setBreakTime(parseInt(e.target.value)));
    getTimerState();
  };

  const handleStartTimer = () => {
    dispatch(timerActions.startTimer());
    getTimerState();
  };

  const handleStopTimer = () => {
    dispatch(timerActions.stopTimer());
    getTimerState();
  };

  const handlePauseTimer = () => {
    dispatch(timerActions.pauseTimer(currentCountdown));
    getTimerState();
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
    <div className="text-neutral-800">
      <p
        className={`text-9xl transition-all duration-200
        ${timerState.isPaused && "text-neutral-400"}
        ${timerState.isBreak && "text-blue-500"}
        `}
      >
        {timerState.countdown.minutes < 10
          ? `0${timerState.countdown.minutes}`
          : timerState.countdown.minutes}
        :
        {timerState.countdown.seconds < 10
          ? `0${timerState.countdown.seconds}`
          : timerState.countdown.seconds}
      </p>
    </div>
  );
};

export default TimerDisplay;
