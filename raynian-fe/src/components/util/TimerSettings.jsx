import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { TimerContext } from "../../context/TimerContext";
import TimerSettingsMenu from "./TimerSettingsMenu";

export default function TimerSettings(props) {
  const { setOpenSettings, settingsRef } = props;
  // const [backgroundOption, setBackgroundOption] = useState("default");
  const dropdownRef = useRef(null);
  // const { workTime, setWorkTime, breakTime, setBreakTime, playSound } =
  //   useContext(TimerContext);

  const [showWorkMenu, setShowWorkMenu] = useState(false);
  const [showBreakMenu, setShowBreakMenu] = useState(false);
  const [showAlarmMenu, setShowAlarmMenu] = useState(false);
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);

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
      className="absolute left-[45px] top-[-46px] rounded-md bg-white text-sm drop-shadow-md dark:bg-slate-700"
      ref={dropdownRef}
    >
      <div
        className="flex justify-between px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
        onMouseEnter={() => setShowWorkMenu(true)}
        onMouseLeave={() => setShowWorkMenu(false)}
      >
        <p className="whitespace-nowrap">Work Time</p>
        {showWorkMenu && <TimerSettingsMenu type={"work"} />}
        {/* <div>
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
        </div> */}
      </div>
      <div
        className="flex justify-between px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
        onMouseEnter={() => setShowBreakMenu(true)}
        onMouseLeave={() => setShowBreakMenu(false)}
      >
        <p className="whitespace-nowrap">Break Time</p>
        {showBreakMenu && <TimerSettingsMenu type={"break"} />}
        {/* <select
          value={breakTime}
          onChange={(e) => {
            setBreakTime(e.target.value);
          }}
          className="focus:outline-none dark:bg-slate-700"
        >
          <option value="15 min">15 min</option>
          <option value="10 min">10 min</option>
          <option value="5 min">5 min</option>
        </select> */}
      </div>
      <div
        className="flex justify-between px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
        onMouseEnter={() => setShowAlarmMenu(true)}
        onMouseLeave={() => setShowAlarmMenu(false)}
      >
        <p className="whitespace-nowrap">Alarm Sound</p>
        {showAlarmMenu && <TimerSettingsMenu type={"alarm"} />}
        {/* <select
          value={breakTime}
          onChange={(e) => {
            setBreakTime(e.target.value);
          }}
          className="focus:outline-none dark:bg-slate-700"
        >
          <option value="15 min">Sound 1</option>
          <option value="10 min">Sound 2</option>
          <option value="5 min">Sound 3</option>
        </select> */}
      </div>
      <div
        className="flex justify-between px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
        onMouseEnter={() => setShowBackgroundMenu(true)}
        onMouseLeave={() => setShowBackgroundMenu(false)}
      >
        <p className="">Background</p>
        {showBackgroundMenu && <TimerSettingsMenu type={"background"} />}
        {/* <select
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
        </select> */}
      </div>
    </div>
  );
}
