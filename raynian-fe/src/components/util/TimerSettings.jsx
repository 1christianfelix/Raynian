import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { TimerContext } from "../../context/TimerContext";

export default function TimerSettings(props) {
  const [workOption, setWorkOption] = useState("default");
  const [breakOption, setBreakOption] = useState("default");
  const [backgroundOption, setBackgroundOption] = useState("default");
  const dropdownRef = useRef(null);

  const { setOpenSettings, settingsRef } = props;

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
      className="absolute top-[7px] left-[65px] bg-white drop-shadow-md rounded-md text-sm py-[15px] px-[20px]"
      ref={dropdownRef}
    >
      <div className="flex justify-between mb-[10px]">
        <p className="mr-[10px] whitespace-nowrap">Work Time</p>
        <div>
          <select
            value={workOption}
            onChange={(e) => {
              setWorkOption(e.target.value);
            }}
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
          value={breakOption}
          onChange={(e) => {
            setBreakOption(e.target.value);
          }}
        >
          <option value="15 min">15 min</option>
          <option value="10 min">10 min</option>
          <option value="5 min">5 min</option>
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
