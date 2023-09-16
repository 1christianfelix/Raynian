import React from "react";
import TimerDisplay from "./TimerDisplay";
import TimerContols from "./TimerContols";

const Timer2 = () => {
  return (
    <div>
      <div className="flex items-center">
        <TimerDisplay />
        <TimerContols />
      </div>
    </div>
  );
};

export default Timer2;
