import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as timerActions from "../../slices/timerSlice";

const TimerSettings = () => {
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer);
  const { roomId } = useSelector((state) => state.room);

  const [workTimerInput, setWorkTimerInput] = useState(
    timerState.workTime.minutes
  );
  const [breakTimerInput, setBreakTimerInput] = useState(
    timerState.breakTime.minutes
  );
  const [longBreakTimerInput, setLongBreakTimerInput] = useState(
    timerState.longBreakTime.minutes
  );
  const [longBreakTimerFrequencyInput, setLongBreakTimerFrequencyInput] =
    useState(timerState.longBreakFrequency);

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
    const newValue = parseInt(e.target.value, 10);

    // Check if the input is empty or a valid integer within the desired range
    if (e.target.value === "" || (newValue >= 0 && newValue <= 999)) {
      setBreakTimerInput(newValue);
    }
  };

  useEffect(() => {
    let timer = {
      hours: 0,
      minutes: breakTimerInput,
      seconds: 0,
    };
    dispatch(timerActions.setBreakTime(timer));
  }, [breakTimerInput]);

  const handleLongBreakFrequencyChange = (e) => {
    const newValue = parseInt(e.target.value, 10);

    // Check if the input is empty or a valid integer within the desired range
    if (e.target.value === "" || newValue >= 0) {
      setLongBreakTimerFrequencyInput(newValue);
      dispatch(timerActions.setLongBreakFrequency(newValue));
    }
  };

  const handleLongBreakTimeChange = (e) => {
    const newValue = parseInt(e.target.value, 10);

    // Check if the input is empty or a valid integer within the desired range
    if (e.target.value === "" || (newValue >= 0 && newValue <= 999)) {
      setLongBreakTimerInput(newValue);
    }
  };

  useEffect(() => {
    let timer = {
      hours: 0,
      minutes: longBreakTimerInput,
      seconds: 0,
    };
    dispatch(timerActions.setLongBreakTime(timer));
  }, [longBreakTimerInput]);

  return (
    <div className="flex w-[450px] flex-col gap-6 rounded-3xl bg-neutral-50 px-[30px] py-10">
      <div className="flex flex-row ">
        <div className="w-1/2 font-normal ">
          <div className="mx-auto flex w-32 flex-col gap-1">
            <label className="text-xs ">Work Timer:</label>
            <div className="flex h-8 w-full flex-row border-b border-neutral-300  focus-within:border-blue-500 focus-within:border-b-2 transition-all duration-100">
              <button
                className="w-20 hover:bg-black/5 "
                onClick={() => {
                  setWorkTimerInput((prev) => {
                    return prev - 1;
                  });
                }}
              >
                -
              </button>
              <input
                className="w-full bg-transparent text-center outline-none"
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

        <div className="w-1/2  font-normal ">
          <div className="mx-auto flex w-32 flex-col gap-1">
            <label className="text-xs ">Break Timer:</label>
            <div className="flex h-8 w-full flex-row border-b border-neutral-300  focus-within:border-blue-500 focus-within:border-b-2 transition-all duration-100">
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  setBreakTimerInput((prev) => {
                    return prev - 1;
                  });
                }}
              >
                -
              </button>
              <input
                className="w-full bg-transparent text-center outline-none"
                id="breakTime"
                type="number" // Set the input type to number
                value={breakTimerInput}
                onChange={handleBreakTimeChange}
              />
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  setBreakTimerInput((prev) => {
                    return prev + 1;
                  });
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center">
        <div className="w-1/2  font-normal ">
          <div className="mx-auto flex w-32 flex-col gap-1">
            <label className="text-xs ">Long Break Frequency:</label>
            <div className="flex h-8 w-full flex-row border-b border-neutral-300  focus-within:border-blue-500 focus-within:border-b-2 transition-all duration-100 ">
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  setLongBreakTimerFrequencyInput((prev) => {
                    return prev - 1;
                  });
                }}
              >
                -
              </button>
              <input
                className="w-full bg-transparent text-center outline-none"
                id="breakTime"
                type="number" // Set the input type to number
                value={longBreakTimerFrequencyInput}
                onChange={handleBreakTimeChange}
              />
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  setLongBreakTimerFrequencyInput((prev) => {
                    return prev + 1;
                  });
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2  font-normal ">
          <div className="mx-auto flex w-32 flex-col gap-1">
            <label className="text-xs ">Long Break Timer:</label>
            <div className="flex h-8 w-full flex-row border-b border-neutral-300  focus-within:border-blue-500 focus-within:border-b-2 transition-all duration-100">
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  setLongBreakTimerInput((prev) => {
                    return prev - 1;
                  });
                }}
              >
                -
              </button>
              <input
                className="w-full bg-transparent text-center outline-none"
                id="breakTime"
                type="number" // Set the input type to number
                value={longBreakTimerInput}
                onChange={handleBreakTimeChange}
              />
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  setLongBreakTimerInput((prev) => {
                    return prev + 1;
                  });
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;
