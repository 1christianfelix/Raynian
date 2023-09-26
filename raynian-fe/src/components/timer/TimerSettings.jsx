import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { GoTriangleLeft } from "react-icons/go";
import * as timerActions from "../../slices/timerSlice";
import { WallpaperContext } from "../../context/WallpaperContex";

const TimerSettings = (props) => {
  const { handleToggleTimerSettings } = props;
  const { wpStyle } = useContext(WallpaperContext);
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
    const input = e?.target?.value || e || 1;
    const value = parseInt(input) || 1;
    if (value < 1) {
      setWorkTimerInput(1);
      return;
    }
    if (value > 999) {
      setWorkTimerInput(999);
      return;
    }
    setWorkTimerInput(value);
  };

  useEffect(() => {
    let minutes = workTimerInput;

    let timer = {
      hours: 0,
      minutes: minutes,
      seconds: 0,
    };

    dispatch(timerActions.setWorkTime(timer));
  }, [workTimerInput]);

  const handleBreakTimeChange = (e) => {
    const input = e?.target?.value || e || 1;
    const value = parseInt(input) || 1;
    if (value < 1) {
      setBreakTimerInput(1);
      return;
    }
    if (value > 999) {
      setBreakTimerInput(999);
      return;
    }
    setBreakTimerInput(value);
  };

  useEffect(() => {
    let minutes = breakTimerInput;

    let timer = {
      hours: 0,
      minutes: minutes,
      seconds: 0,
    };
    dispatch(timerActions.setBreakTime(timer));
  }, [breakTimerInput]);

  const handleLongBreakFrequencyChange = (e) => {
    const input = e?.target?.value || e;
    const value = parseInt(input) || 0;
    if (value < 0) {
      setLongBreakTimerFrequencyInput(0);
      return;
    }
    setLongBreakTimerFrequencyInput(value);
  };

  const handleLongBreakTimeChange = (e) => {
    const input = e?.target?.value || e || 1;
    const value = parseInt(input) || 1;
    if (value < 1) {
      setLongBreakTimerInput(1);
      return;
    }
    if (value > 999) {
      setLongBreakTimerInput(999);
      return;
    }
    setLongBreakTimerInput(value);
  };

  const handleAutoStart = (e) => {
    dispatch(timerActions.setAutoStart(e.target.checked));
  };

  useEffect(() => {
    const minutes = longBreakTimerInput;
    const frequency =
      parseInt(longBreakTimerFrequencyInput) &&
      parseInt(longBreakTimerFrequencyInput) > 0
        ? parseInt(longBreakTimerFrequencyInput)
        : 0;
    let timer = {
      hours: 0,
      minutes: minutes,
      seconds: 0,
    };
    dispatch(timerActions.setLongBreakFrequency(frequency));
    dispatch(timerActions.setLongBreakTime(timer));
  }, [longBreakTimerInput, longBreakTimerFrequencyInput]);

  return (
    <div
      className="relative flex w-[450px] flex-col gap-6 rounded-3xl bg-neutral-50 px-[30px] py-10"
      style={{ ...wpStyle, boxShadow: "" }}
    >
      {workTimerInput < 30 && (
        <span className="mx-auto text-sm font-bold text-red-600">
          Streaks Disabled! (Minimum work time of 30 minutes needed)
        </span>
      )}
      <div className="absolute right-4 top-4">
        <div onClick={handleToggleTimerSettings} className="cursor-pointer">
          <RxCross1 />
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="w-1/2 font-normal ">
          <div className="mx-auto flex w-32 flex-col gap-1">
            <label className="text-xs ">Work Timer:</label>
            <div className="flex h-8 w-full flex-row border-b border-neutral-300  transition-all duration-100 focus-within:border-b-2 focus-within:border-blue-500">
              <button
                className="w-20 hover:bg-black/5 "
                onClick={() => {
                  handleWorkTimeChange(workTimerInput - 1);
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
                  handleWorkTimeChange(workTimerInput + 1);
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
            <div className="flex h-8 w-full flex-row border-b border-neutral-300  transition-all duration-100 focus-within:border-b-2 focus-within:border-blue-500">
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  handleBreakTimeChange(breakTimerInput - 1);
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
                  handleBreakTimeChange(breakTimerInput + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center">
        <div className="w-1/2  font-normal ">
          <div className="mx-auto flex w-32 flex-col gap-1">
            <label className="text-xs ">Long Break Frequency:</label>
            <div className="flex h-8 w-full flex-row border-b border-neutral-300  transition-all duration-100 focus-within:border-b-2 focus-within:border-blue-500 ">
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  handleLongBreakFrequencyChange(
                    longBreakTimerFrequencyInput - 1
                  );
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
                  handleLongBreakFrequencyChange(
                    longBreakTimerFrequencyInput + 1
                  );
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
            <div className="flex h-8 w-full flex-row border-b border-neutral-300  transition-all duration-100 focus-within:border-b-2 focus-within:border-blue-500">
              <button
                className="w-20 hover:bg-black/5"
                onClick={() => {
                  handleLongBreakTimeChange(longBreakTimerInput - 1);
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
                  handleLongBreakTimeChange(longBreakTimerInput + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border"></div>
      <div className="flex flex-row items-center text-xs font-normal">
        <div className="mx-8 w-full">
          <div className="flex flex-row items-center justify-between">
            <div>Automatically Start Next Session After Breaks</div>
            <input
              type="checkbox"
              checked={timerState.autoStart}
              onChange={handleAutoStart}
            ></input>
          </div>
        </div>
      </div>
      <div className="absolute -left-6 top-1 text-neutral-50">
        <GoTriangleLeft size={44} />
      </div>
    </div>
  );
};

export default TimerSettings;
