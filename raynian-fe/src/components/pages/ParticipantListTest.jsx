import React, { useEffect, useState } from "react";
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

  const handleStartTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);

    setCountdown({
      hours: 0,
      minutes: workTime,
      seconds: 0,
    });
  };

  const handlePauseTimer = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const subtract = () => {
    setCountdown((prevCountdown) => {
      const { hours, minutes, seconds } = prevCountdown;

      return {
        hours,
        minutes,
        seconds: seconds - 1,
      };
    });
  };

  useEffect(() => {
    console.log("test");
  }, [subtract]);

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
      <div className="flex gap-2">
        <button onClick={handleStartTimer}>StartTimer</button>
        <button onClick={handleStopTimer}>StopTimer</button>
        <button onClick={handlePauseTimer}>PauseTimer</button>
        <button onClick={subtract}>subtracttest</button>
      </div>
    </div>
  );
};

export default ParticipantListTest;
