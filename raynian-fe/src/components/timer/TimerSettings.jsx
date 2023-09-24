import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import * as timerActions from "../../slices/timerSlice";

const TimerSettings = (props) => {
  const { handleToggleTimerSettings } = props;
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
    setWorkTimerInput(e.target.value);
  };

  useEffect(() => {
    const minutes = parseInt(workTimerInput);
    let timer = {
      hours: 0,
      minutes: minutes && minutes >= 0 ? minutes : 1,
      seconds: 0,
    };

    dispatch(timerActions.setWorkTime(timer));
  }, [workTimerInput]);

  const handleBreakTimeChange = (e) => {
    setWorkTimerInput(e.target.value);
  };

  useEffect(() => {
    const minutes = parseInt(breakTimerInput);
    let timer = {
      hours: 0,
      minutes: minutes && minutes >= 0 ? minutes : 1,
      seconds: 0,
    };
    dispatch(timerActions.setBreakTime(timer));
  }, [breakTimerInput]);

  const handleLongBreakFrequencyChange = (e) => {
    setLongBreakTimerFrequencyInput(e.target.value);
  };

  const handleLongBreakTimeChange = (e) => {
    setLongBreakTimerInput(e.target.value);
  };

  useEffect(() => {
    const minutes = parseInt(longBreakTimerInput);
    const frequency =
      parseInt(longBreakTimerFrequencyInput) &&
      parseInt(longBreakTimerFrequencyInput) > 0
        ? parseInt(longBreakTimerFrequencyInput)
        : 0;
    let timer = {
      hours: 0,
      minutes: minutes && minutes >= 0 ? minutes : 1,
      seconds: 0,
    };
    dispatch(timerActions.setLongBreakFrequency(frequency));
    dispatch(timerActions.setLongBreakTime(timer));
  }, [longBreakTimerInput, longBreakTimerFrequencyInput]);

  return (
    <div className="relative flex w-[450px] flex-col gap-6 rounded-3xl bg-neutral-50 px-[30px] py-10">
      <div className="absolute right-4 top-4">
        <div onClick={handleToggleTimerSettings} className="cursor-pointer">
          <RxCross1 />
        </div>
      </div>
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
                id="longBreakFrequency"
                type="number" // Set the input type to number
                value={longBreakTimerFrequencyInput}
                onChange={handleLongBreakFrequencyChange}
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
                id="longBreakTime"
                type="number" // Set the input type to number
                value={longBreakTimerInput}
                onChange={handleLongBreakTimeChange}
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
