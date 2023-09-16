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
      };

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

  return (
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
          <option value={1}>30 minutes</option>
        </select>

        <label htmlFor="breakTime">Break Time:</label>
        <select
          id="breakTime"
          value={timerState.breakTime}
          onChange={handleBreakTimeChange}
        >
          <option value={15}>15 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={1}>5 minutes</option>
        </select>
      </div>
      <button onClick={handleStartTimer}>StartTimer</button>
      <button onClick={handleStopTimer}>StopTimer</button>
      <button onClick={handlePauseTimer}>PauseTimer</button>
    </div>
  );
};

export default TimerContols;
