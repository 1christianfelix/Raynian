import React, { useState } from "react";
import ParticipantTimer from "./ParticipantTimer";

const ParticipantListTest = () => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 1,
    seconds: 0,
  });
  const [workTime, setWorkTime] = useState(60);
  const [breakTime, setBreakTime] = useState(15);
  const [isBreak, setIsBreak] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="">
      <div className="flex gap-3">
        <div>User 1</div>
        <ParticipantTimer
          timer={countdown}
          isBreak={isBreak}
          isWork={isWork}
          isRunning={isRunning}
          isPaused={isPaused}
        />
      </div>
      <button
        onClick={() => {
          setIsRunning((prev) => !prev);
        }}
      >
        start guest timer
      </button>
    </div>
  );
};

export default ParticipantListTest;
