import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as timerActions from "../../slices/timerSlice";
import {
  updateTimerStatus,
  sendCurrentTimerStatus,
} from "../socket/socketConnection";

const TimerDisplay = () => {
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

  // update selected timer
  useEffect(() => {
    if (!timerState.isRunning && !timerState.isPaused) {
      if (timerState.isWork) {
        dispatch(timerActions.updateCountdown(timerState.workTime));
      } else if (timerState.isBreak) {
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

    // updating tab title
    let minutes =
      timerState.countdown.minutes < 10
        ? `0${timerState.countdown.minutes}`
        : `${timerState.countdown.minutes}`;
    let seconds =
      timerState.countdown.seconds < 10
        ? `0${timerState.countdown.seconds}`
        : `${timerState.countdown.seconds}`;
    document.title = timerState.isRunning
      ? minutes + ":" + seconds + " | Raynian"
      : "Raynian";
  }, [roomId, timerState.isWork, timerState.isBreak, timerState.countdown]);

  // useEffect(() => {
  //   if(timerState.isWork && timerState.countdown == countdown)
  // }, [timerState.isWork, timerState.isBreak]);

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
