import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { TimerContext } from "../../context/TimerContext";

export default function TimerSettingsMenu(props) {
  const { type } = props;

  const { workTime, setWorkTime, breakTime, setBreakTime, playSound } =
    useContext(TimerContext);

  let content;

  if (type === "work") {
    content = (
      <div className="bg-white drop-shadow-md rounded-md text-sm absolute dark:bg-slate-700 left-[115px] top-[0px]">
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600">
          60 min
        </p>
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600over:bg-gray-200 dark:hover:bg-gray-600">
          45 min
        </p>
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600">
          30 min
        </p>
      </div>
    );
  }
  if (type === "break") {
    content = (
      <div className="bg-white drop-shadow-md rounded-md text-sm absolute dark:bg-slate-700 left-[115px] top-[0px]">
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600">
          15 min
        </p>
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600">
          10 min
        </p>
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600">
          5 min
        </p>
      </div>
    );
  }
  if (type === "alarm") {
    content = (
      <div className="bg-white drop-shadow-md rounded-md text-sm absolute dark:bg-slate-700 left-[115px] top-[0px]">
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600">
          option1
        </p>
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600">
          option2
        </p>
        <p className="whitespace-nowrap py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600">
          option3
        </p>
      </div>
    );
  }
  if (type === "background") {
    content = (
      <div className="bg-white drop-shadow-md rounded-md text-sm absolute dark:bg-slate-700 left-[115px] top-[0px]">
        <div>
          <div>a</div>
        </div>
      </div>
    );
  }
  return content;
}
