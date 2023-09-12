import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as timerActions from "../../slices/timerSlice";

const TestTimer = () => {
  // const [workTime, setWorkTime] = useState(60);
  // const [breakTime, setBreakTime] = useState(15);

  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);
  const countdown = timerState.countdown;

  const handleWorkTimeChange = (e) => {
    dispatch(timerActions.setWorkTime(parseInt(e.target.value)));
  };

  const handleBreakTimeChange = (e) => {
    dispatch(timerActions.setBreakTime(parseInt(e.target.value)));
  };

  const handleStartTimer = (e) => {
    dispatch(timerActions.startTimer());
  };

  const handleStopTimer = (e) => {
    dispatch(timerActions.stopTimer());
  };

  const handlePauseTimer = (e) => {
    dispatch(timerActions.pauseTimer());
  };

  return (
    <div>
      <p className="text-[128px] leading-tight">
        {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}:
        {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
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
      </div>
    </div>
  );
};

export default TestTimer;
