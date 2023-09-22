import React, { useEffect, useState } from "react";
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
  const [workTimerInput, setWorkTimerInput] = useState(
    timerState.workTime.minutes
  );

  const handleWorkTimeChange = (e) => {
    const newValue = parseInt(e.target.value, 10);

    // Check if the input is empty or a valid integer within the desired range
    if (e.target.value === "" || (newValue >= 0 && newValue <= 999)) {
      setWorkTimerInput(newValue);
    }
  };

  useEffect(() => {
    let timer = {
      hours: 0,
      minutes: workTimerInput,
      seconds: 0,
    };
    dispatch(timerActions.setWorkTime(timer));
  }, [workTimerInput]);

  const handleBreakTimeChange = (e) => {
    let timer = {
      hours: 0,
      minutes: parseInt(e.target.value),
      seconds: 0,
    };
    dispatch(timerActions.setBreakTime(timer));
  };

  return (
    <div className="flex w-[450px] flex-col rounded-3xl px-[30px] py-10">
      <div className="flex flex-col">
        <div className="flex flex-col justify-between">
          <p>Work Time:</p>
          <div className="w-32 border border-transparent focus-within:border-blue-500">
            <div className="flex flex-row w-full">
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  setWorkTimerInput((prev) => {
                    return prev - 1;
                  });
                }}
              >
                -
              </button>
              <input
                className="w-full text-center outline-none bg-transparent"
                id="workTime"
                type="number" // Set the input type to number
                value={workTimerInput}
                onChange={handleWorkTimeChange}
              />
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  setWorkTimerInput((prev) => {
                    return prev + 1;
                  });
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="custom-number-input h-10 w-32">
          <label
            for="custom-input-number"
            class="w-full text-gray-700 text-sm font-semibold"
          >
            Counter Input
          </label>
          <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              data-action="decrement"
              class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default  text-gray-700  outline-none"
              name="custom-input-number"
              value="0"
            ></input>
            {/* <button
              data-action="increment"
              class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span class="m-auto text-2xl font-thin">+</span>
            </button> */}
          </div>
        </div>

        <div className="flex justify-between">
          <p>Break Time:</p>
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
    </div>
  );
};

export default TimerSettings;
