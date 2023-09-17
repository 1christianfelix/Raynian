import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as timerActions from "../../slices/timerSlice";
import {
  updateTimerStatus,
  sendCurrentTimerStatus,
} from "../socket/socketConnection";

const TimerSettings = () => {
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);
  const { roomId } = useSelector((state) => state.room);

  const handleWorkTimeChange = (e) => {
    let timer = {
      hours: 0,
      minutes: parseInt(e.target.value),
      seconds: 0,
    };
    dispatch(timerActions.setWorkTime(timer));
  };

  const handleBreakTimeChange = (e) => {
    let timer = {
      hours: 0,
      minutes: parseInt(e.target.value),
      seconds: 0,
    };
    dispatch(timerActions.setBreakTime(timer));
  };

  return (
    <div>
      <div className="inline-block">
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
    </div>
  );
};

export default TimerSettings;
