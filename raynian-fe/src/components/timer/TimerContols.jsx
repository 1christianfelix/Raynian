import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as timerActions from "../../slices/timerSlice";
import {
  updateTimerStatus,
  sendCurrentTimerStatus,
} from "../socket/socketConnection";

const TimerContols = () => {
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);
  const { roomId } = useSelector((state) => state.room);

  // const getTimerState = async () => {
  //   const timerData = await dispatch(timerActions.getTimerState());
  //   if (roomId != null) {
  //     const updatedTimerData = {
  //       countdown: timerData.countdown,
  //       isRunning: timerData.isRunning,
  //       isBreak: timerData.isBreak,
  //       isWork: timerData.isWork,
  //       isPaused: timerData.isPaused,
  //       workTime: timerData.workTime,
  //       breakTime: timerData.breakTime,
  //     };

  //     updateTimerStatus(updatedTimerData, roomId);
  //   }
  // };

  const handleStartTimer = () => {
    dispatch(timerActions.startTimer());
    // getTimerState();
  };

  const handleStopTimer = () => {
    dispatch(timerActions.stopTimer());
    // getTimerState();
  };

  const handlePauseTimer = () => {
    dispatch(timerActions.pauseTimer());
    // getTimerState();
  };

  return (
    <div className="flex flex-col items-start">
      <button onClick={handleStartTimer}>StartTimer</button>
      <button onClick={handleStopTimer}>StopTimer</button>
      <button onClick={handlePauseTimer}>PauseTimer</button>
    </div>
  );
};

export default TimerContols;
