import React from "react";
import TimerDisplay from "./TimerDisplay";
import TimerContols from "./TimerContols";
import TimerSettings from "./TimerSettings";

const Timer2 = () => {
  return (
    <div className="w-[100%] px-4">
      <div className="inline-flex items-center">
        <TimerDisplay />
        <TimerContols />
      </div>
    </div>
  );
};

export default Timer2;
