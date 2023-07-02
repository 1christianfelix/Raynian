import React from "react";
import { useContext, useState } from "react";
import { TimerContext } from "../../context/TimerContext";

export default function TimerSettings() {
  const [workOption, setWorkOption] = useState("default");
  const [breakOption, setBreakOption] = useState("default");
  const [backgroundOption, setBackgroundOption] = useState("default");

  const handleChange = (e) => {
    setWorkOption(e.target.value);
  };

  return (
    <div className="absolute top-[7px] left-[65px] bg-white drop-shadow-md rounded-md text-sm py-[15px] px-[20px]">
      <div className="flex justify-between mb-[10px]">
        <p className="mr-[10px] whitespace-nowrap">Work Time</p>
        <div>
          <select
            value={workOption}
            onChange={(e) => {
              setWorkOption(e.target.value);
            }}
          >
            <option value="default">default</option>
            <option value="option1">option1</option>
            <option value="option2">option2</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mb-[10px]">
        <p className="mr-[10px] whitespace-nowrap">Break Time</p>
        <select
          value={breakOption}
          onChange={(e) => {
            setBreakOption(e.target.value);
          }}
        >
          <option value="default">default</option>
          <option value="option1">option1</option>
          <option value="option2">option2</option>
        </select>
      </div>
      <div className="flex justify-between">
        <p className="mr-[25px]">Background</p>
        <select
          value={backgroundOption}
          onChange={(e) => {
            setBackgroundOption(e.target.value);
          }}
        >
          <option value="default">default</option>
          <option value="option1">option1</option>
          <option value="option2">option2</option>
        </select>
      </div>
    </div>
  );
}
