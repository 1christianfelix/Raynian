import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { TimerContext } from "../../context/TimerContext";

export default function TimerSettings(props) {
  const { setOpenSettings, settingsRef } = props;
  const [backgroundOption, setBackgroundOption] = useState("default");
  const dropdownRef = useRef(null);
  const { workTime, setWorkTime, breakTime, setBreakTime, playSound } =
    useContext(TimerContext);

  const handleClickOutside = (event) => {
    if (settingsRef.current && settingsRef.current.contains(event.target)) {
      return;
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenSettings(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className="absolute top-[-38px] left-[45px] bg-white drop-shadow-md rounded-md text-sm py-[15px] px-[20px] dark:bg-slate-700"
      ref={dropdownRef}
    >
      <div className="flex justify-between mb-[10px]">
        <p className="mr-[10px] whitespace-nowrap">Work Time</p>
        <div>
          <select
            value={workTime}
            onChange={(e) => {
              setWorkTime(e.target.value);
            }}
            className="focus:outline-none dark:bg-slate-700"
          >
            <option value="60 min">60 min</option>
            <option value="45 min">45 min</option>
            <option value="30 min">30 min</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mb-[10px]">
        <p className="mr-[10px] whitespace-nowrap">Break Time</p>
        <select
          value={breakTime}
          onChange={(e) => {
            setBreakTime(e.target.value);
          }}
          className="focus:outline-none dark:bg-slate-700"
        >
          <option value="15 min">15 min</option>
          <option value="10 min">10 min</option>
          <option value="5 min">5 min</option>
        </select>
      </div>
      <div className="flex justify-between mb-[10px]">
        <p className="mr-[10px] whitespace-nowrap">Alarm Sound</p>
        <select
          value={breakTime}
          onChange={(e) => {
            setBreakTime(e.target.value);
          }}
          className="focus:outline-none dark:bg-slate-700"
        >
          <option value="15 min">Sound 1</option>
          <option value="10 min">Sound 2</option>
          <option value="5 min">Sound 3</option>
        </select>
      </div>
      <div className="flex justify-between">
        <p className="mr-[25px]">Background</p>
        <select
          value={backgroundOption}
          onChange={(e) => {
            e.preventDefault();
            playSound();
          }}
          className="focus:outline-none dark:bg-slate-700"
        >
          <option value="default">default</option>
          <option value="option1">option1</option>
          <option value="option2">option2</option>
        </select>
      </div>
    </div>
  );
}
